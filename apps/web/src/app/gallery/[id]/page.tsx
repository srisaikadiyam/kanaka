import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { GalleryGrid } from '@/components/GalleryGrid';
import { getGalleryItemById } from '@/content/gallery';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = getGalleryItemById(params.id);

  if (!item) {
    return { title: 'Gallery' };
  }

  return {
    title: item.title,
    description: item.caption,
    openGraph: {
      title: `${item.title} · Snap Styles`,
      description: item.caption,
      images: [{ url: item.src, width: item.width, height: item.height, alt: item.alt }]
    }
  };
}

export default function GalleryItemPage({ params }: { params: { id: string } }) {
  const item = getGalleryItemById(params.id);
  if (!item) notFound();

  return (
    <Container className="py-16">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Gallery</h1>
        <p className="max-w-2xl text-ink-700">
          Direct link to a gallery item. The lightbox opens automatically and the URL remains shareable.
        </p>
      </div>
      <GalleryGrid activeIdFromRoute={params.id} />
    </Container>
  );
}
