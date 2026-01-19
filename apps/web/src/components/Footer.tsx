import { Container } from '@/components/Container';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/5 bg-surface-0">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-700">© {year} Snap Styles. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <a className="text-ink-700 hover:text-ink-900" href="/terms">
              Terms
            </a>
            <a className="text-ink-700 hover:text-ink-900" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
