import { Container } from '@/components/Container';
import type { HomeContent } from '@/content/home';

export function ProofStrip({ proof }: { proof: HomeContent['proof'] }) {
  return (
    <section className="bg-surface-0">
      <Container className="py-10">
        <dl className="grid gap-6 rounded-xl bg-surface-50 p-6 ring-1 ring-black/5 md:grid-cols-3">
          {proof.items.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wide text-ink-500">{item.label}</dt>
              <dd className="mt-2 text-lg font-semibold text-ink-900">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
