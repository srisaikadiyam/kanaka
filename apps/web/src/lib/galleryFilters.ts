import type { GalleryCategory } from '@/content/gallery';

export type GalleryCategoriesParamInput = string | string[] | undefined;

function coerceToString(value: GalleryCategoriesParamInput): string | undefined {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.join(',');
  return undefined;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll('&', ' and ')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
}

export function categoryToSlug(category: GalleryCategory): string {
  return slugify(category);
}

function normalizeSelected(
  selected: ReadonlyArray<GalleryCategory>,
  allCategories: ReadonlyArray<GalleryCategory>
): Array<GalleryCategory> {
  const orderIndex = new Map<GalleryCategory, number>();
  allCategories.forEach((cat, idx) => orderIndex.set(cat, idx));

  const unique = new Set<GalleryCategory>();
  for (const cat of selected) {
    if (orderIndex.has(cat)) unique.add(cat);
  }

  const normalized = Array.from(unique);
  normalized.sort((a, b) => (orderIndex.get(a) ?? 0) - (orderIndex.get(b) ?? 0));

  const isAllSelected =
    normalized.length === allCategories.length && allCategories.every((cat) => unique.has(cat));

  return isAllSelected ? [] : normalized;
}

export function parseGalleryCategoriesParam(
  value: GalleryCategoriesParamInput,
  allCategories: ReadonlyArray<GalleryCategory>
): Array<GalleryCategory> {
  const raw = coerceToString(value);
  if (!raw) return [];

  const slugToCategory = new Map<string, GalleryCategory>();
  for (const cat of allCategories) {
    slugToCategory.set(categoryToSlug(cat), cat);
    slugToCategory.set(cat.toLowerCase(), cat);
  }

  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const decoded: Array<GalleryCategory> = [];
  for (const part of parts) {
    const slug = slugify(part);
    const cat = slugToCategory.get(slug) ?? slugToCategory.get(part.toLowerCase());
    if (cat) decoded.push(cat);
  }

  return normalizeSelected(decoded, allCategories);
}

export function serializeGalleryCategoriesParam(
  selected: ReadonlyArray<GalleryCategory>,
  allCategories: ReadonlyArray<GalleryCategory>
): string | null {
  const normalized = normalizeSelected(selected, allCategories);
  if (normalized.length === 0) return null;

  return normalized.map(categoryToSlug).join(',');
}

export function buildGalleryHref({
  id,
  selected,
  allCategories
}: {
  id?: string | null;
  selected: ReadonlyArray<GalleryCategory>;
  allCategories: ReadonlyArray<GalleryCategory>;
}): string {
  const base = id ? `/gallery/${encodeURIComponent(id)}` : '/gallery';
  const c = serializeGalleryCategoriesParam(selected, allCategories);
  if (!c) return base;
  return `${base}?c=${c}`;
}
