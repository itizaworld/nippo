'use client';

import { useEffect, FC } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getDateString } from '~/libs/getDateString';

type Props = {
  body?: string;
  date: string;
};

export const NippoPreview: FC<Props> = ({ body, date }) => {
  useEffect(() => {
    if (!document.documentElement) return;
    // NOTE: 初期はlightモード固定にする。アプリ自体がダークモードに対応したらブラウザの設定に合わせる
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  return (
    <MarkdownPreview
      source={body || `${getDateString(date)}の日報はまだありません`}
      rehypePlugins={[rehypeSanitize]}
      style={{ background: 'white', padding: '16px', border: '1px solid hsl(210, 18%, 87%)', borderRadius: '8px' }}
    />
  );
};