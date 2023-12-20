'use client';

import { FC, useCallback } from 'react';
import { Editor } from '~/app/_components/uiParts/Editor';
import { Task } from '~/domains/Task';

type Props = {
  task?: Task;
};

export const TaskEditor: FC<Props> = ({ task }) => {
  const handleEditorChange = useCallback(async (body: string) => {
    console.log(body);
  }, []);

  return <Editor body={task?.body} onChange={handleEditorChange} placeholder="タスクの内容を記入しましょう" />;
};
