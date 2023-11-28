import { Metadata } from 'next';

const DEFAULT_TITLE = 'みんなの日報';
const DEFAULT_DESCRIPTION = 'みんなの日報は日々の振り返りをサポートするアプリケーションです。';
const DEFAULT_URL = 'https://nippo.wiscro.app/';

type Args = {
  title?: string;
  description?: string;
  url?: string;
};

export const generateNippoMetadata = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, url = DEFAULT_URL }: Args): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'みんなの日報',
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
};
