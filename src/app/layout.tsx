import { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { NippoNavbar } from '~/app/_components/layouts/NippoNavbar';
import { NippoFooter } from '~/app/_components/layouts/NippoFooter';

const title = 'みんなの日報';
const description = 'みんなの日報は日々の振り返りをサポートするアプリケーションです。';
const url = 'https://nippo.wiscro.app/';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    site: '@same_gum',
    creator: '@same_gum',
  },
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="light min-h-[100vh] bg-slate-50">
      <body className="min-h-[100vh] flex flex-col">
        <NippoNavbar />
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <NippoFooter />
      </body>
    </html>
  );
}
