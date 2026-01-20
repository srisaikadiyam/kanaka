import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Levels',
  description: 'Legacy page placeholder — migration planned.'
};

export default function LevelsPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Levels"
        lead="Placeholder page. We’ll decide whether to keep this as a public page or retire it with a redirect."
      />
    </Container>
  );
}
