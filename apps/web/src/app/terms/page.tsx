import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Terms',
  description: 'Terms and policies for Snap Styles.'
};

export default function TermsPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Terms"
        lead="This page will be migrated from the legacy site and rewritten to match the new brand voice. For launch, ensure it contains at least: contact details, data handling (contact form), and any required disclosures."
      />
    </Container>
  );
}
