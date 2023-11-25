'use client';

import dynamic from 'next/dynamic';
import { useEffect, useCallback, useState, FC } from 'react';
import { debounce } from 'lodash';
import { postNippo } from '~/app/_actions/nippoActions';
import { Nippo } from '~/domains/Nippo';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });

type Props = {
  objectiveId: string;
  date: string;
  todayNippo?: Nippo;
};

export const NippoEditor: FC<Props> = ({ objectiveId, date, todayNippo }) => {
  const [value, setValue] = useState(todayNippo?.body || '');
  // NOTE: Loading状態を表示する
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!document.documentElement) return;
    // NOTE: 初期はlightモード固定にする。アプリ自体がダークモードに対応したらブラウザの設定に合わせる
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  const handleEditorChange = useCallback(
    async (body: string) => {
      setValue(body);
      if (isUpdating) return;

      setIsUpdating(true);
      await postNippo({ objectiveId, date, body }).finally(() => {
        setIsUpdating(false);
      });
    },
    [date, isUpdating, objectiveId],
  );

  return <MarkdownEditor height="500px" value={value} onChange={debounce(handleEditorChange, 200)} />;
};
