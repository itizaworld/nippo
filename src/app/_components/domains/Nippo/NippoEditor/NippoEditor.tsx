'use client';

import { FC, useCallback } from 'react';
import { postNippo } from '~/app/_actions/nippoActions';
import { Nippo } from '~/domains/Nippo';
import { Editor } from '~/app/_components/uiParts/Editor';

type Props = {
  objectiveId: string;
  nippo?: Nippo;
  date: string;
};

export const NippoEditor: FC<Props> = ({ objectiveId, nippo, date }) => {
  const handleEditorChange = useCallback(
    async (body: string) => {
      await postNippo({ objectiveId, date, body });
    },
    [date, objectiveId],
  );

  return <Editor body={nippo?.body} onChange={handleEditorChange} placeholder="振り返りを記入しましょう！" />;
};
