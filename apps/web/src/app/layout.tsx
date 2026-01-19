import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.snapstyles.in'),
  title: {
    default: 'Snap Styles',
    template: '%s · Snap Styles'
  },
  description: 'Premium creator styling, content support, and brand-ready visuals — reimagined.',
  openGraph: {
    type: 'website',
    siteName: 'Snap Styles'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-xl bg-surface-0 px-4 py-2 shadow-soft"
        >
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
