'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lightbox } from '@/components/Lightbox';
import { galleryCategories, galleryItems, type GalleryCategory } from '@/content/gallery';

export function GalleryGrid({ activeIdFromRoute }: { activeIdFromRoute: string | null }) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(activeIdFromRoute);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'All'>('All');

  useEffect(() => {
    setActiveId(activeIdFromRoute);
  }, [activeIdFromRoute]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeIndex = useMemo(() => {
    if (!activeId) return -1;
    return galleryItems.findIndex((item) => item.id === activeId);
  }, [activeId]);

  const activeItem = activeIndex >= 0 ? galleryItems[activeIndex] : undefined;

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <FilterChip
          active={activeCategory === 'All'}
          label="All"
          onClick={() => setActiveCategory('All')}
        />
        {galleryCategories.map((cat) => (
          <FilterChip
            key={cat}
            active={activeCategory === cat}
            label={cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveId(item.id);
              router.push(`/gallery/${item.id}`, { scroll: false });
            }}
            className="group relative overflow-hidden rounded-xl bg-surface-0 text-left shadow-soft ring-1 ring-black/5"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={false}
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-ink-900">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-ink-500">{item.caption}</p>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-brand-500 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <Lightbox
        open={!!activeItem}
        item={activeItem}
        onClose={() => {
          setActiveId(null);
          router.push('/gallery', { scroll: false });
        }}
        onNext={() => {
          if (!activeItem) return;
          const nextIndex = (activeIndex + 1) % galleryItems.length;
          const nextId = galleryItems[nextIndex]!.id;
          setActiveId(nextId);
          router.replace(`/gallery/${nextId}`, { scroll: false });
        }}
        onPrev={() => {
          if (!activeItem) return;
          const prevIndex = (activeIndex - 1 + galleryItems.length) % galleryItems.length;
          const prevId = galleryItems[prevIndex]!.id;
          setActiveId(prevId);
          router.replace(`/gallery/${prevId}`, { scroll: false });
        }}
      />
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-full px-3 py-1 text-sm ring-1 ring-black/10 transition-colors ' +
        (active ? 'bg-brand-50 text-ink-900 ring-brand-500/40' : 'bg-surface-0 text-ink-700 hover:bg-surface-50')
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

