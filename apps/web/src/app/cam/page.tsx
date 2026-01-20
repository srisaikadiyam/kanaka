import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Snap Stream',
  description: 'Legacy page placeholder — migration planned.'
};

export default function CamPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Snap Stream"
        lead="Placeholder page for the Snap Stream experience. We’ll decide whether to keep this under a “Labs” section or link out to a dedicated app."
      />
    </Container>
  );
}
