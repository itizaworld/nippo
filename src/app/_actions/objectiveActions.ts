'use server';

import { redirect } from 'next/navigation';
import { API_OBJECTIVE } from '../_constants/apiUrls';
import { URLS } from '../_constants/urls';
import { Objective } from '~/domains/Objective';
import { apiPost } from '~/libs/apiClient';

export const postObjective = async (name: string) => {
  return await apiPost<{ object: Objective }>(API_OBJECTIVE(), {
    body: JSON.stringify({
      name,
      description: name,
    }),
  }).then((res) => {
    const { _id } = res.object;
    redirect(URLS.OBJECTIVE(_id));
  });
};
