import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Crew & Pilot',
  description: 'Legacy page placeholder — migration planned.'
};

export default function CrewPilotPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="Crew & Pilot"
        lead="Placeholder page. If this is part of the product offering, we’ll convert it into a polished branded landing."
      />
    </Container>
  );
}
