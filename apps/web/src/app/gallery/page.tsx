import { Container } from '@/components/Container';
import { GalleryGrid } from '@/components/GalleryGrid';

export const metadata = {
  title: 'Gallery',
  description: 'A curated preview of the new Snap Styles visual direction.'
};

export default function GalleryPage() {
  return (
    <Container className="py-16">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Gallery</h1>
        <p className="max-w-2xl text-ink-700">
          This gallery is powered by a typed manifest (IDs, captions, categories, credits) and rendered via Next Image.
          Replace placeholders with curated licensed stock when ready.
        </p>
      </div>
      <GalleryGrid activeIdFromRoute={null} />
    </Container>
  );
}
