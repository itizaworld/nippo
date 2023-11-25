'use client';

import { FC } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import MarkdownPreview from '@uiw/react-markdown-preview';

type Props = {
  body: string;
};

export const NippoPreview: FC<Props> = ({ body }) => {
  return (
    <MarkdownPreview
      source={body}
      rehypePlugins={[rehypeSanitize]}
      style={{ padding: '16px', border: '1px solid hsl(210, 18%, 87%)', borderRadius: '8px' }}
    />
  );
};
