'use client';

import dynamic from 'next/dynamic';
import { useEffect, FC } from 'react';
import rehypeSanitize from 'rehype-sanitize';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), { ssr: false });

type Props = {
  body: string;
};

export const NippoPreview: FC<Props> = ({ body }) => {
  useEffect(() => {
    if (!document.documentElement) return;
    // NOTE: 初期はlightモード固定にする。アプリ自体がダークモードに対応したらブラウザの設定に合わせる
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  return <MarkdownPreview source={body} rehypePlugins={[rehypeSanitize]} />;
};
