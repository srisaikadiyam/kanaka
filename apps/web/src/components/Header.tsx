import Link from 'next/link';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { HeaderNav } from '@/components/HeaderNav';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-surface-0/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <Logo />
          <span className="text-base font-semibold tracking-tight">Snap Styles</span>
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNav items={nav} />
        </div>
      </Container>
    </header>
  );
}
