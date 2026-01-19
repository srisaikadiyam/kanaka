# Snap Styles Web (Next.js)

This folder contains the new rebranded website implementation (Home/Gallery/Contact). Authentication is intentionally deferred.

## Local dev

1. Install dependencies
   - `npm install`
2. Start dev server
   - `npm run dev`

## Storybook

- `npm run storybook`

## Notes

- Legacy `.html` routes are redirected in `next.config.mjs`.
- Do **not** reuse checked-in vendor bundles from the legacy site (see repo root `js/bootstrap.js`).

## Contact delivery (optional)

The contact form posts to `/api/contact`. Delivery is optional and is enabled via environment variables.

- Slack notifications:
   - `SLACK_WEBHOOK_URL` (Incoming Webhook URL)
- Email via Resend:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (destination inbox)
   - `CONTACT_FROM_EMAIL` (verified sender)

See `docs/contact-delivery.md` for setup details.

## Security headers

Basic security headers + CSP are set in `next.config.mjs` via `headers()`.
