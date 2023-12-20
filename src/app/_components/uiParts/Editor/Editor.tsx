'use client';

import './styles.scss';

import { Color } from '@tiptap/extension-color';
import { Link } from '@tiptap/extension-link';
import { useEffect, useState, FC, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import { useDebounce } from '~/libs/useDebounce';

type Props = {
  body?: string;
  placeholder: string;
  onChange: (body: string) => Promise<void>;
};

export const Editor: FC<Props> = ({ body, placeholder, onChange }) => {
  const [inputText, setInputText] = useState<string>();
  const debouncedInputText = useDebounce({ value: inputText, delay: 200 });

  const handleEditorChange = useCallback(
    async (body: string) => {
      await onChange(body);
    },
    [onChange],
  );

  useEffect(() => {
    debouncedInputText && handleEditorChange(debouncedInputText);
  }, [debouncedInputText, handleEditorChange]);

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    Link.configure(),
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
      placeholder,
    }),
    Heading.configure({
      levels: [1, 2, 3, 4, 5],
    }),
  ];

  const editor = useEditor({
    extensions,
    content: body,
    autofocus: 'end',
    onUpdate: ({ editor }) => {
      setInputText(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[400px]',
      },
    },
  });

  return <EditorContent editor={editor} />;
};
