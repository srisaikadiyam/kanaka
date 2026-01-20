import Link from 'next/link';
import { Container } from '@/components/Container';
import type { HomeContent } from '@/content/home';

export function HeroSection({ hero }: { hero: HomeContent['hero'] }) {
  return (
    <section className="bg-surface-0">
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full bg-surface-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink-900 ring-1 ring-black/10">
              {hero.eyebrow}
            </p>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">{hero.title}</h1>
            <p className="text-xl leading-relaxed text-ink-700">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-ink-900 px-5 text-base font-medium text-white ring-1 ring-black/10 hover:bg-ink-700"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-surface-0 px-5 text-base font-medium text-ink-900 ring-1 ring-black/15 hover:bg-surface-50"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
            <p className="text-sm text-ink-500">Authentication is intentionally deferred.</p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-surface-50 to-surface-100" />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
