import { Container } from '@/components/Container';
import { GalleryGrid } from '@/components/GalleryGrid';
import { PageHeader } from '@/components/PageHeader';
import { redirect } from 'next/navigation';
import { parseGalleryCategoriesParam, serializeGalleryCategoriesParam } from '@/lib/galleryFilters';
import { GALLERY_CATEGORIES } from '@/content/gallery';

export const metadata = {
  title: 'Gallery',
  description: 'A curated preview of the new Snap Styles visual direction.'
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function GalleryPage({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const rawC = resolvedSearchParams?.c;
  if (rawC !== undefined) {
    const selected = parseGalleryCategoriesParam(rawC, GALLERY_CATEGORIES);
    const canonicalC = serializeGalleryCategoriesParam(selected, GALLERY_CATEGORIES);

    const rawCString = Array.isArray(rawC) ? rawC.join(',') : rawC;

    if (!canonicalC) {
      redirect('/gallery');
    }

    if (rawCString !== canonicalC) {
      redirect(`/gallery?c=${canonicalC}`);
    }
  }

  return (
    <Container className="py-16">
      <PageHeader
        title="Gallery"
        lead="This gallery is powered by a typed manifest (IDs, captions, categories, credits) and rendered via Next Image. Replace placeholders with curated licensed stock when ready."
      />
      <GalleryGrid activeIdFromRoute={null} />
    </Container>
  );
}
