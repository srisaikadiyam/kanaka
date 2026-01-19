import Link from 'next/link';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-surface-0/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-tight">Snap Styles</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink-700 hover:text-ink-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-brand-600"
        >
          Contact
        </Link>
      </Container>
    </header>
  );
}
