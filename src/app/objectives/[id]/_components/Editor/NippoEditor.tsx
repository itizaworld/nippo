'use client';

import dynamic from 'next/dynamic';
import { useEffect, useCallback, useState, FC } from 'react';
import { postNippo } from '~/app/_actions/nippoActions';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });

const mdStr = `# ここにタイトルが入ります  \n## マークダウン形式で記入ができます  \n###### This is a H6`;

type Props = {
  objectiveId: string;
  date: string;
};

export const NippoEditor: FC<Props> = ({ objectiveId, date }) => {
  // NOTE: Loading状態を表示する
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!document.documentElement) return;
    // NOTE: 初期はlightモード固定にする。アプリ自体がダークモードに対応したらブラウザの設定に合わせる
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  const handleEditorChange = useCallback(
    async (body: string) => {
      if (isUpdating) return;

      setIsUpdating(true);
      await postNippo({ objectiveId, date, body }).finally(() => {
        setIsUpdating(false);
      });
    },
    [date, isUpdating, objectiveId],
  );

  return <MarkdownEditor height="500px" value={mdStr} onChange={handleEditorChange} />;
};
