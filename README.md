# Chris & Yumi — Wedding Registry

A single-page wedding registry (`index.html`). It lists the items for our first home, grouped by budget:

| Tier | Range |
|---|---|
| Under ₱5k | small kitchen gifts |
| ~₱10k | ₱5k – ₱15k |
| ~₱20k | ₱15k – ₱30k |
| ₱30k & up | big-ticket and group gifts |

Categories: Bed (frame and mattress listed separately), TV, Sofa, Dining Table, Kitchenware.

## Editing

Everything you can edit is near the top of the `<script>` block in `index.html`:

- `DELIVERY_NOTE`: delivery instructions shown to guests. **Don't put the full home address here if the site is public.** Ask guests to message you for it.
- `ITEMS`: add, remove, or re-price items. Each item has `cat`, `tier`, `name`, `price`, `store`, `why`, and `url`.

## Publishing with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / root. The site will be at
`https://chrityabut.github.io/ChrisYumiGiftRegistry/`.

Prices were checked in November 2026 and change often with sales. Re-check them before sharing the link.
