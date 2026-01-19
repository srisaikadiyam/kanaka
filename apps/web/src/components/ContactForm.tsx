'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/Button';

type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });

  const errors = useMemo(() => {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!email.trim()) next.email = 'Please enter your email.';
    else if (!isValidEmail(email.trim())) next.email = 'Please enter a valid email.';
    if (!message.trim()) next.message = 'Please enter a message.';
    return next;
  }, [name, email, message]);

  const canSubmit = Object.keys(errors).length === 0 && formState.status !== 'submitting';

  return (
    <form
      className="rounded-xl bg-surface-0 p-6 shadow-soft ring-1 ring-black/5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setFormState({ status: 'submitting' });
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, email, message, company })
          });

          if (!response.ok) {
            const data = (await response.json().catch(() => null)) as null | { error?: string };
            setFormState({
              status: 'error',
              message: data?.error || 'Something went wrong. Please try again.'
            });
            return;
          }

          setFormState({ status: 'success' });
        } catch {
          setFormState({ status: 'error', message: 'Something went wrong. Please try again.' });
        }
      }}
      noValidate
    >
      <div className="space-y-5">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-surface-0 px-3 text-sm"
            autoComplete="name"
            required
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-surface-0 px-3 text-sm"
            autoComplete="email"
            inputMode="email"
            required
          />
        </Field>

        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-28 w-full resize-y rounded-xl border border-black/10 bg-surface-0 px-3 py-2 text-sm"
            required
          />
        </Field>

        <div className="flex items-center justify-between gap-4">
          <Button type="submit" size="lg" disabled={!canSubmit}>
            {formState.status === 'submitting' ? 'Sending…' : 'Send message'}
          </Button>
          <p className="text-xs text-ink-500">We’ll respond soon.</p>
        </div>

        {formState.status === 'success' ? (
          <div className="rounded-xl bg-brand-50 p-4 text-sm text-ink-900">
            Message received. We’ll get back to you shortly.
          </div>
        ) : null}
        {formState.status === 'error' ? (
          <div className="rounded-xl bg-surface-100 p-4 text-sm text-ink-900">{formState.message}</div>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-900">
        {label}
      </label>
      <div className="mt-2">
        {children}
      </div>
      {error ? (
        <p className="mt-2 text-sm text-brand-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
