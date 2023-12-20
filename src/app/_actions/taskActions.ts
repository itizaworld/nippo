'use server';

import { API_TASK } from '../_constants/apiUrls';
import { apiPost } from '~/libs/apiClient';
import { Task } from '~/domains/Task';

export const postTask = async ({
  body,
  title,
  dueDate,
  objectiveId,
}: {
  body: string;
  title: string;
  dueDate: Date;
  objectiveId: string;
}) => {
  return await apiPost<{ task: Task }>(API_TASK(), {
    body: JSON.stringify({
      body,
      title,
      dueDate,
      objectiveId,
    }),
  });
};
