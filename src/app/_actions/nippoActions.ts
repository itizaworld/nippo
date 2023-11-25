'use server';

import { API_OBJECTIVE_ID_NIPPO } from '../_constants/apiUrls';
import { apiPost } from '~/libs/apiClient';
import { Nippo } from '~/domains/Nippo';

export const postNippo = async ({ objectiveId, body, date }: { objectiveId: string; body: string; date: string }) => {
  return await apiPost<{ nippo: Nippo }>(API_OBJECTIVE_ID_NIPPO(objectiveId), {
    body: JSON.stringify({
      body,
      date,
    }),
  });
};
