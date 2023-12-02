'use client';

import './styles.scss';

import { Color } from '@tiptap/extension-color';
import dynamic from 'next/dynamic';
import { useEffect, useCallback, useState, FC } from 'react';
import { debounce } from 'lodash';
import { EditorContent, useEditor } from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import { postNippo } from '~/app/_actions/nippoActions';
import { Nippo } from '~/domains/Nippo';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });

type Props = {
  objectiveId: string;
  date: string;
  nippo?: Nippo;
};

export const NippoEditor: FC<Props> = ({ objectiveId, date, nippo }) => {
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

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
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
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;

  return (
    <MarkdownEditor
      height="471px" // NOTE: 21pxはツールバーの高さ
      value={nippo?.body}
      onChange={debounce(handleEditorChange, 200)}
    />
  );
};
