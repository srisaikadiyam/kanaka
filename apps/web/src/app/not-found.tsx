import Link from 'next/link';
import { Container } from '@/components/Container';

export const metadata = {
  title: 'Page not found'
};

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="max-w-xl rounded-xl bg-surface-0 p-8 shadow-soft ring-1 ring-black/5">
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-ink-700">
          The page you’re looking for doesn’t exist (or has moved). Use the navigation, or go back home.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-500 px-4 text-sm font-medium text-white shadow-soft hover:bg-brand-600"
          >
            Go to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-surface-0 px-4 text-sm font-medium text-ink-900 ring-1 ring-black/10 hover:bg-surface-50"
          >
            Contact
          </Link>
        </div>
      </div>
    </Container>
  );
}
