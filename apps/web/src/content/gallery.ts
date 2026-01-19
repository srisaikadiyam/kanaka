import galleryRaw from './gallery.json';

export type GalleryCategory =
  | 'Studio'
  | 'Lifestyle'
  | 'Product'
  | 'Portrait'
  | 'Editorial'
  | 'Texture';

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  src: string;
  width: number;
  height: number;
  alt: string;
  creditName?: string;
  creditUrl?: string;
  licenseNote?: string;
};

export const galleryItems = galleryRaw as unknown as GalleryItem[];

export const galleryCategories: Array<GalleryCategory> = Array.from(
  new Set(galleryItems.map((item) => item.category))
);

export function getGalleryItemById(id: string | undefined) {
  if (!id) return undefined;
  return galleryItems.find((item) => item.id === id);
}

export function getGalleryIndexById(id: string | undefined) {
  if (!id) return -1;
  return galleryItems.findIndex((item) => item.id === id);
}
