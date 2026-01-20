import { redirect } from 'next/navigation';
import { GALLERY_CATEGORIES } from '@/content/gallery';
import { parseGalleryCategoriesParam, serializeGalleryCategoriesParam } from '@/lib/galleryFilters';

// Deprecated route.
// We keep this file only to avoid breaking older links while we finalize route cleanup.
// Canonical deep-link route is /gallery/[id].
type SearchParams = Record<string, string | string[] | undefined>;

export default async function DeprecatedGalleryCatchAll({
  searchParams
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const selected = parseGalleryCategoriesParam(resolvedSearchParams?.c, GALLERY_CATEGORIES);
  const canonicalC = serializeGalleryCategoriesParam(selected, GALLERY_CATEGORIES);

  redirect(canonicalC ? `/gallery?c=${canonicalC}` : '/gallery');
}
