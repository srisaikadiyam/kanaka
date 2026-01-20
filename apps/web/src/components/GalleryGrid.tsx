'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lightbox } from '@/components/Lightbox';
import { Button } from '@/components/Button';
import { galleryCategories, galleryItems, type GalleryCategory, GALLERY_CATEGORIES } from '@/content/gallery';
import { buildGalleryHref, parseGalleryCategoriesParam } from '@/lib/galleryFilters';

export function GalleryGrid({ activeIdFromRoute }: { activeIdFromRoute: string | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(activeIdFromRoute);

  useEffect(() => {
    setActiveId(activeIdFromRoute);
  }, [activeIdFromRoute]);

  const selectedCategories = useMemo(() => {
    return parseGalleryCategoriesParam(searchParams.getAll('c'), GALLERY_CATEGORIES);
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) return galleryItems;
    const selected = new Set<GalleryCategory>(selectedCategories);
    return galleryItems.filter((item) => selected.has(item.category));
  }, [selectedCategories]);

  const activeIndex = useMemo(() => {
    if (!activeId) return -1;
    return filteredItems.findIndex((item) => item.id === activeId);
  }, [activeId, filteredItems]);

  const activeItem = activeIndex >= 0 ? filteredItems[activeIndex] : undefined;

  const activeSharePath = useMemo(() => {
    if (!activeItem) return undefined;
    return buildGalleryHref({ id: activeItem.id, selected: selectedCategories, allCategories: GALLERY_CATEGORIES });
  }, [activeItem, selectedCategories]);

  function toggleCategory(category: GalleryCategory) {
    const next = new Set<GalleryCategory>(selectedCategories);
    if (next.has(category)) next.delete(category);
    else next.add(category);

    const currentId = activeId;
    router.push(
      buildGalleryHref({
        id: currentId,
        selected: Array.from(next),
        allCategories: GALLERY_CATEGORIES
      }),
      { scroll: false }
    );
  }

  function clearCategories() {
    const currentId = activeId;
    router.push(buildGalleryHref({ id: currentId, selected: [], allCategories: GALLERY_CATEGORIES }), { scroll: false });
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <FilterChip
          active={selectedCategories.length === 0}
          label="All"
          onClick={clearCategories}
        />
        {galleryCategories.map((cat) => (
          <FilterChip
            key={cat}
            active={selectedCategories.includes(cat)}
            label={cat}
            onClick={() => toggleCategory(cat)}
          />
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="mt-10 rounded-xl bg-surface-50 p-6 ring-1 ring-black/10">
          <p className="text-base font-medium text-ink-900">No matches for the selected categories.</p>
          <p className="mt-2 max-w-2xl text-sm text-ink-700">
            Try removing a category, or clear filters to view the full gallery.
          </p>
          <div className="mt-4">
            <Button variant="secondary" onClick={clearCategories}>
              Clear filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveId(item.id);
                router.push(
                  buildGalleryHref({ id: item.id, selected: selectedCategories, allCategories: GALLERY_CATEGORIES }),
                  { scroll: false }
                );
              }}
              className="group relative overflow-hidden rounded-xl bg-surface-0 text-left ring-1 ring-black/10"
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
              <div className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-ink-900 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={!!activeItem}
        item={activeItem}
        sharePath={activeSharePath}
        onClose={() => {
          setActiveId(null);
          router.push(buildGalleryHref({ selected: selectedCategories, allCategories: GALLERY_CATEGORIES }), {
            scroll: false
          });
        }}
        onNext={() => {
          if (!activeItem) return;
          const nextIndex = (activeIndex + 1) % filteredItems.length;
          const nextId = filteredItems[nextIndex]!.id;
          setActiveId(nextId);
          router.replace(
            buildGalleryHref({ id: nextId, selected: selectedCategories, allCategories: GALLERY_CATEGORIES }),
            { scroll: false }
          );
        }}
        onPrev={() => {
          if (!activeItem) return;
          const prevIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
          const prevId = filteredItems[prevIndex]!.id;
          setActiveId(prevId);
          router.replace(
            buildGalleryHref({ id: prevId, selected: selectedCategories, allCategories: GALLERY_CATEGORIES }),
            { scroll: false }
          );
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
        'rounded-full px-3 py-1 text-sm font-medium ring-1 transition-colors ' +
        (active
          ? 'bg-ink-900 text-white ring-black/10'
          : 'bg-surface-0 text-ink-900 ring-black/15 hover:bg-surface-50')
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

