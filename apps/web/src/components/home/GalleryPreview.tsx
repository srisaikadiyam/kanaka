import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { galleryItems } from '@/content/gallery';
import type { HomeContent } from '@/content/home';

export function GalleryPreview({ galleryPreview }: { galleryPreview: HomeContent['galleryPreview'] }) {
  const items = galleryItems.slice(0, Math.max(0, galleryPreview.count));
  return (
    <section>
      <Container className="py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{galleryPreview.title}</h2>
            <p className="mt-2 max-w-2xl text-ink-700">{galleryPreview.subtitle}</p>
          </div>
          <Link href={galleryPreview.cta.href} className="text-sm font-medium text-brand-600 underline">
            {galleryPreview.cta.label}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/gallery/${item.id}`}
              className="group overflow-hidden rounded-xl bg-surface-0 shadow-soft ring-1 ring-black/5"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-ink-900">{item.title}</p>
                <p className="mt-1 text-xs text-ink-500">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
