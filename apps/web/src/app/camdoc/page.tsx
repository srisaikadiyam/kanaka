import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Snap Stream Docs',
  description: 'Legacy page placeholder — migration planned.'
};

export default function CamDocPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Snap Stream Docs"
        lead="Placeholder docs page. We’ll migrate content and restructure it for readability and SEO."
      />
    </Container>
  );
}
