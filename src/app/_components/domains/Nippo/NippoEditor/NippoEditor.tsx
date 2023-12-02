'use client';

import './styles.scss';

import { Color } from '@tiptap/extension-color';
import { useEffect, useCallback, useState, FC } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import { format } from 'date-fns';
import { postNippo } from '~/app/_actions/nippoActions';
import { Nippo } from '~/domains/Nippo';
import { getCurrentDate } from '~/libs/getCurrentDate';

type Props = {
  objectiveId: string;
  nippo?: Nippo;
  editable: boolean;
};

export const NippoEditor: FC<Props> = ({ objectiveId, nippo, editable }) => {
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
      await postNippo({ objectiveId, date: nippo?.date || format(getCurrentDate(), 'yyyy-MM-dd'), body }).finally(() => {
        setIsUpdating(false);
      });
    },
    [isUpdating, nippo?.date, objectiveId],
  );

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    Placeholder.configure({
      placeholder: '振り返りを記入しましょう！',
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5],
    }),
  ];

  const editor = useEditor({
    extensions,
    content: nippo?.body,
    autofocus: true,
    editable,
    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: editable ? 'min-h-[400px]' : '',
      },
    },
  });

  return <EditorContent editor={editor} />;
};
