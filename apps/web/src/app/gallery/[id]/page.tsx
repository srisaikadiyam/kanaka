import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Container } from '@/components/Container';
import { GalleryGrid } from '@/components/GalleryGrid';
import { PageHeader } from '@/components/PageHeader';
import { getGalleryItemById, GALLERY_CATEGORIES } from '@/content/gallery';
import { parseGalleryCategoriesParam, serializeGalleryCategoriesParam } from '@/lib/galleryFilters';

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

type SearchParams = Record<string, string | string[] | undefined>;

export default async function GalleryItemPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const item = getGalleryItemById(resolvedParams.id);
  if (!item) notFound();

  const rawC = resolvedSearchParams?.c;
  if (rawC !== undefined) {
    const selected = parseGalleryCategoriesParam(rawC, GALLERY_CATEGORIES);
    const canonicalC = serializeGalleryCategoriesParam(selected, GALLERY_CATEGORIES);
    const rawCString = Array.isArray(rawC) ? rawC.join(',') : rawC;

    if (selected.length > 0 && !selected.includes(item.category)) {
      redirect(`/gallery/${encodeURIComponent(resolvedParams.id)}`);
    }

    if (!canonicalC) {
      redirect(`/gallery/${encodeURIComponent(resolvedParams.id)}`);
    }

    if (rawCString !== canonicalC) {
      redirect(`/gallery/${encodeURIComponent(resolvedParams.id)}?c=${canonicalC}`);
    }
  }

  return (
    <Container className="py-16">
      <PageHeader
        title="Gallery"
        lead="Direct link to a gallery item. The lightbox opens automatically and the URL remains shareable."
      />
      <GalleryGrid activeIdFromRoute={resolvedParams.id} />
    </Container>
  );
}
