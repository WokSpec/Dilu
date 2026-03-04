import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dilu — Build like WokSpec',
  description: 'Pick a template. Ship your product. Own your code. No dashboards. No complexity. Just build.',
  metadataBase: new URL('https://dilu.wokspec.org'),
  openGraph: {
    title: 'Dilu — Build like WokSpec',
    description: 'The WokSpec launchpad. Pick a template, ship your product, own your code.',
    url: 'https://dilu.wokspec.org',
    siteName: 'Dilu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dilu — Build like WokSpec',
    description: 'The WokSpec launchpad. Pick a template, ship your product, own your code.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dilu-bg text-white antialiased font-sans">{children}</body>
    </html>
  );
}
