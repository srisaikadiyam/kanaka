import { Container } from '@/components/Container';

export const metadata = {
  title: 'Terms',
  description: 'Terms and policies for Snap Styles.'
};

export default function TermsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Terms</h1>
      <p className="mt-4 max-w-2xl text-ink-700">
        This page will be migrated from the legacy site and rewritten to match the new brand voice. For launch, ensure
        it contains at least: contact details, data handling (contact form), and any required disclosures.
      </p>
    </Container>
  );
}
