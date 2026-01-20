import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

const rateLimitState: Map<string, { count: number; resetAt: number }> = new Map();

function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = rateLimitState.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitState.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (existing.count >= limit) return true;
  existing.count += 1;
  rateLimitState.set(key, existing);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rlKey = `contact:${ip}`;

  if (isRateLimited(rlKey, 10, 60_000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (isNonEmptyString(payload.company)) {
    // Honeypot triggered: pretend success to avoid training bots.
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!isNonEmptyString(payload.name)) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }

  if (!isNonEmptyString(payload.email) || !isValidEmail(payload.email.trim())) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  if (!isNonEmptyString(payload.message)) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  const deliveryTasks: Array<Promise<{ provider: string; ok: boolean; detail?: string }>> = [];

  // Slack (optional)
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;
  if (slackWebhook) {
    deliveryTasks.push(
      (async () => {
        const text = `New Snap Styles contact\n\nName: ${name}\nEmail: ${email}\nIP: ${ip}\n\nMessage:\n${message}`;
        const res = await fetch(slackWebhook, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ text })
        });
        return { provider: 'slack', ok: res.ok, detail: res.ok ? undefined : `status ${res.status}` };
      })()
    );
  }

  // Resend (optional)
  const resendKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom = process.env.CONTACT_FROM_EMAIL;
  if (resendKey && contactTo && contactFrom) {
    deliveryTasks.push(
      (async () => {
        const subject = `Snap Styles inquiry from ${name}`;
        const html = `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height: 1.5;">
            <h2 style="margin: 0 0 12px;">New contact request</h2>
            <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin: 0 0 6px;"><strong>IP:</strong> ${escapeHtml(ip)}</p>
            <hr style="margin: 16px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
          </div>
        `;
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${resendKey}`,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            from: contactFrom,
            to: contactTo,
            reply_to: email,
            subject,
            html
          })
        });
        return { provider: 'resend', ok: res.ok, detail: res.ok ? undefined : `status ${res.status}` };
      })()
    );
  }

  if (deliveryTasks.length === 0) {
    // No provider configured. Still acknowledge success to the user.
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  const results = await Promise.allSettled(deliveryTasks);
  const normalized = results.map((r) => (r.status === 'fulfilled' ? r.value : { provider: 'unknown', ok: false }));
  const anyOk = normalized.some((r) => r.ok);

  if (!anyOk) {
    return NextResponse.json(
      {
        error: 'We could not deliver your message right now. Please try again shortly.',
        delivered: false
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

