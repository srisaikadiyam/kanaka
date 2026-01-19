import { Container } from '@/components/Container';

export const metadata = {
  title: 'Snap Stream',
  description: 'Legacy page placeholder — migration planned.'
};

export default function CamPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Snap Stream</h1>
      <p className="mt-4 max-w-2xl text-ink-700">
        Placeholder page for the Snap Stream experience. We’ll decide whether to keep this under a “Labs” section or
        link out to a dedicated app.
      </p>
    </Container>
  );
}
