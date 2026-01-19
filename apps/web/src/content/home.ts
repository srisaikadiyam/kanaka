import homeRaw from './home.json';

export type HomeCta = { label: string; href: string };

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: HomeCta;
    secondaryCta: HomeCta;
  };
  features: Array<{ title: string; description: string }>;
  proof: { items: Array<{ label: string; value: string }> };
  galleryPreview: {
    title: string;
    subtitle: string;
    count: number;
    cta: HomeCta;
  };
};

export const homeContent = homeRaw as unknown as HomeContent;
