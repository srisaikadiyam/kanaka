'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@/content/gallery';

export function Lightbox({
  open,
  item,
  onClose,
  onNext,
  onPrev
}: {
  open: boolean;
  item?: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    return () => {
      lastActiveElementRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;

        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (!active || active === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, onNext, onPrev]);

  if (!open) return null;

  const title = item?.title ?? 'Gallery item';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${title}`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="w-full max-w-4xl overflow-hidden rounded-xl bg-surface-0 shadow-soft">
        <div className="flex items-center justify-between border-b border-black/10 p-4">
          <p className="text-sm font-medium text-ink-900">{title ?? 'Gallery item'}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={async () => {
                if (!item) return;
                const url = `${window.location.origin}/gallery/${item.id}`;
                try {
                  await navigator.clipboard.writeText(url);
                } catch {
                  // best-effort fallback
                  window.prompt('Copy link:', url);
                }
              }}
              className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-surface-100"
            >
              Copy link
            </button>
            {item ? (
              <a
                href={item.src}
                download
                className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-surface-100"
              >
                Download
              </a>
            ) : null}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-surface-100"
            >
              Close
            </button>
          </div>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface-100">
            {item ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 70vw, 100vw"
                priority
              />
            ) : null}
          </div>
          <div className="flex justify-between gap-2 md:flex-col">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-xl bg-surface-0 px-4 py-3 text-sm ring-1 ring-black/10 hover:bg-surface-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-surface-0 px-4 py-3 text-sm ring-1 ring-black/10 hover:bg-surface-50"
            >
              Next
            </button>
          </div>
        </div>
        {item ? (
          <div className="border-t border-black/10 p-4">
            <p className="text-sm text-ink-700">{item.caption}</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500">
              <span>Category: {item.category}</span>
              <span>
                Credit: {item.creditName ?? '—'}
                {item.creditUrl ? (
                  <a className="ml-2 underline" href={item.creditUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : null}
              </span>
            </div>
            {item.licenseNote ? <p className="mt-2 text-xs text-ink-500">{item.licenseNote}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
