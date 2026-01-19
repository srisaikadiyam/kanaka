# Gallery manifest workflow

The Gallery is driven by a typed manifest so design/content can update assets without touching React code.

## Files

- Manifest: [src/content/gallery.json](../src/content/gallery.json)
- Types/helpers: [src/content/gallery.ts](../src/content/gallery.ts)
- Placeholder assets: [public/gallery](../public/gallery)

## How to replace placeholders with curated stock

1. Add your licensed images under `public/gallery/`.
2. Update `src/content/gallery.json`:
   - `src`: point to the new `/gallery/<filename>`
   - `width` / `height`: set the real pixel dimensions (prevents CLS)
   - `alt`: write meaningful alt text (not the filename)
   - `creditName` / `creditUrl`: the stock source + link
   - `licenseNote`: optional internal note (e.g., license ID / restrictions)

## Categories

The filter chips are derived from `category` values in the manifest. Keep categories consistent (title case) to avoid duplicates.

## Licensing ledger (recommended)

Maintain a separate ledger (spreadsheet) with:
- Asset ID (matches `id`)
- Source (vendor)
- License type
- Purchase date
- Model/property release status
- Where used (page/section)

Before launch: confirm all assets are licensed for commercial web use.
