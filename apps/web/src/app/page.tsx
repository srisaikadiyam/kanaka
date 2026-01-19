import { homeContent } from '@/content/home';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { ProofStrip } from '@/components/home/ProofStrip';
import { GalleryPreview } from '@/components/home/GalleryPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection hero={homeContent.hero} />
      <ProofStrip proof={homeContent.proof} />
      <FeatureGrid features={homeContent.features} />
      <GalleryPreview galleryPreview={homeContent.galleryPreview} />
    </>
  );
}

