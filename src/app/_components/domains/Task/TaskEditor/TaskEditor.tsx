'use client';

import { FC } from 'react';
import { Editor } from '~/app/_components/uiParts/Editor';

type Props = {
  onChangeText: (body: string) => Promise<void>;
};

export const TaskEditor: FC<Props> = ({ onChangeText }) => {
  return <Editor onChange={onChangeText} placeholder="タスクの内容を記入しましょう" />;
};
