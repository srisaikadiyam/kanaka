import { Container } from '@/components/Container';
import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Snap Styles.'
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Contact</h1>
          <p className="text-ink-700">
            Send a message and we’ll get back to you. This form is wired for accessibility and production UX. Delivery
            integration will be finalized during launch hardening.
          </p>
          <div className="rounded-xl bg-surface-0 p-5 shadow-soft ring-1 ring-black/5">
            <p className="text-sm text-ink-700">
              Alternate contact:
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a className="text-brand-600 underline" href="tel:+919994405463">
                  Call: +91 99944 05463
                </a>
              </li>
              <li>
                <a className="text-brand-600 underline" href="https://t.me/snapstyles" target="_blank" rel="noreferrer">
                  Telegram: @snapstyles
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
