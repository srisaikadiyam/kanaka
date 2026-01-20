'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function HeaderNav({
  items
}: {
  items: Array<{ href: string; label: string }>;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={
                'text-sm font-medium text-ink-900 underline-offset-4 ' +
                (active ? 'underline decoration-2' : 'hover:underline')
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/contact"
        aria-current={isActive('/contact') ? 'page' : undefined}
        className={
          'rounded-xl bg-ink-900 px-4 py-2 text-sm font-medium text-white ring-1 ring-black/10 hover:bg-ink-700 ' +
          (isActive('/contact') ? 'outline outline-2 outline-offset-2 outline-ink-900' : '')
        }
      >
        Contact
      </Link>
    </>
  );
}
