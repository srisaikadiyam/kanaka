import { Container } from '@/components/Container';

export const metadata = {
  title: 'Levels',
  description: 'Legacy page placeholder — migration planned.'
};

export default function LevelsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Levels</h1>
      <p className="mt-4 max-w-2xl text-ink-700">
        Placeholder page. We’ll decide whether to keep this as a public page or retire it with a redirect.
      </p>
    </Container>
  );
}
