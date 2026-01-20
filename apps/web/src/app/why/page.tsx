import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Why Snap Styles',
  description: 'Legacy page placeholder — migration planned.'
};

export default function WhyPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Why Snap Styles"
        lead="Placeholder page. We’ll rewrite this as a conversion-focused story page aligned to the new brand messaging."
      />
    </Container>
  );
}
