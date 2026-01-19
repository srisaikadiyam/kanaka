# Contact delivery

The Contact form submits to `/api/contact`.

Delivery is optional and driven by environment variables. If no provider is configured, the API still returns `{ ok: true, delivered: false }`.

## Slack (recommended for MVP)

1. Create an Incoming Webhook in your Slack workspace.
2. Set:

- `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...`

## Resend (email)

1. Create a Resend API key.
2. Verify your sending domain / from address.
3. Set:

- `RESEND_API_KEY=...`
- `CONTACT_TO_EMAIL=hello@snapstyles.in`
- `CONTACT_FROM_EMAIL=Snap Styles <no-reply@snapstyles.in>`

## Notes

- The API uses a honeypot field (`company`) and a simple in-memory IP rate limit.
- If *all* configured providers fail, the API responds with HTTP `502`.
