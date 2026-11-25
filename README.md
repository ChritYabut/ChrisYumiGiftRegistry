# Chris & Yumi — Wedding Registry

A single-page wedding registry (`index.html`). It lists the items for our first home, grouped by budget:

| Tier | Range |
|---|---|
| Under ₱5k | small kitchen gifts |
| ~₱10k | ₱5k – ₱15k |
| ~₱20k | ₱15k – ₱30k |
| ₱30k & up | big-ticket and group gifts |

Categories: Bed (frame and mattress listed separately), TV, Sofa & MUJI bean bags, Dining Table, Kitchenware.

## Editing

Everything you can edit is near the top of the `<script>` block in `index.html`:

- `DELIVERY_NOTE`: delivery instructions shown to guests. **Don't put the full home address here if the site is public.** Ask guests to message you for it.
- `ITEMS`: add, remove, or re-price items. Each item has `cat`, `tier`, `name`, `price`, `store`, `why`, and `url`.

## "Mark as taken" (Google Sheet)

Guests tap **I'll give this** (or **Chip in** on ₱30k & up items). Their name, contact, and note are saved to a Google Sheet that only you can open. The page only shows "Already taken" or "N chipping in". Names are never shown publicly.

One-time setup:

1. Create a new Google Sheet (e.g. "Wedding Registry Claims").
2. Go to **Extensions → Apps Script**, delete the sample code, and paste in everything from `apps-script/Code.gs`. Save.
3. Click **Deploy → New deployment**, choose the gear icon, then **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, allow the permissions, and copy the **Web app URL** (it ends in `/exec`).
4. In `index.html`, paste that URL into `const CLAIMS_URL = "";` and commit.

To **undo** a claim (a guest changed their mind), delete that row in the **Claims** tab.
Item IDs come from item names, so if you rename an item, claims made under the old name stop matching it.
If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Publishing with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / root. The site will be at
`https://chrityabut.github.io/ChrisYumiGiftRegistry/`.

Prices were checked in November 2026 and change often with sales. Re-check them before sharing the link.
