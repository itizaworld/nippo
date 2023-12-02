import './globals.css';
import { Providers } from './providers';
import { NippoNavbar } from '~/app/_components/layouts/NippoNavbar';
import { NippoFooter } from '~/app/_components/layouts/NippoFooter';

import { generateNippoMetadata } from '~/libs/generateNippoMetadata';

export const metadata = generateNippoMetadata({});

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
