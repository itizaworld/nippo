'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });

const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

export const NippoEditor = () => {
  useEffect(() => {
    if (!document.documentElement) return;
    // NOTE: 初期はlightモード固定にする。アプリ自体がダークモードに対応したらブラウザの設定に合わせる
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  return (
    <MarkdownEditor
      height="500px"
      value={mdStr}
      onChange={(value, viewUpdate) => {
        console.log(value, viewUpdate);
      }}
    />
  );
};
