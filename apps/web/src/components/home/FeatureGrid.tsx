import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import type { HomeContent } from '@/content/home';

export function FeatureGrid({ features }: { features: HomeContent['features'] }) {
  return (
    <section>
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </Container>
    </section>
  );
}
