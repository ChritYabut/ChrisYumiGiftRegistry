/**
 * Chris & Yumi wedding registry: claim tracker.
 * Paste this into Extensions → Apps Script of a Google Sheet, then deploy as a web app
 * (Execute as: Me, Who has access: Anyone). See README.md.
 *
 * Each claim is one row in the "Claims" tab. To undo a claim, delete its row.
 */
const SHEET_NAME = 'Claims';
const HEADERS = ['Timestamp', 'Item ID', 'Item', 'Name', 'Contact', 'Note', 'Type'];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Stops guest text from being read as a spreadsheet formula, and caps its length.
function clean_(v, max) {
  let s = String(v == null ? '' : v).slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

// GET → status per item, without names: { "item-id": { taken: true, chips: 0 } }
function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const out = {};
  rows.forEach(function (r) {
    const id = String(r[1] || '');
    if (!id) return;
    out[id] = out[id] || { taken: false, chips: 0 };
    if (r[6] === 'chip') out[id].chips++;
    else out[id].taken = true;
  });
  return json_(out);
}

// POST (text/plain JSON) → { ok: true } or { ok: false, error: 'taken' | 'invalid' }
function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'invalid' }); }
  if (!d || !d.id || !d.name || !String(d.name).trim()) return json_({ ok: false, error: 'invalid' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = getSheet_();
    const type = d.type === 'chip' ? 'chip' : 'claim';
    const id = clean_(d.id, 80);
    if (type === 'claim') {
      const rows = sh.getDataRange().getValues().slice(1);
      if (rows.some(function (r) { return String(r[1]) === id && r[6] !== 'chip'; })) {
        return json_({ ok: false, error: 'taken' });
      }
    }
    sh.appendRow([new Date(), id, clean_(d.item, 200), clean_(d.name, 100),
                  clean_(d.contact, 100), clean_(d.note, 300), type]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}
