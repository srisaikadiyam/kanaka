import { Container } from '@/components/Container';
import { ContactForm } from '@/components/ContactForm';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Snap Styles.'
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <PageHeader
            title="Contact"
            lead="Send a message and we’ll get back to you. This form is wired for accessibility and production UX. Delivery integration will be finalized during launch hardening."
          />
          <div className="rounded-xl bg-surface-0 p-5 ring-1 ring-black/15">
            <p className="text-sm font-medium text-ink-900">
              Alternate contact:
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a className="text-ink-900 underline underline-offset-4" href="tel:+919994405463">
                  Call: +91 99944 05463
                </a>
              </li>
              <li>
                <a
                  className="text-ink-900 underline underline-offset-4"
                  href="https://t.me/snapstyles"
                  target="_blank"
                  rel="noreferrer"
                >
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
