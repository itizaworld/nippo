'use server';

import { API_OBJECTIVE } from '../_constants/apiUrls';
import { apiPost } from '~/libs/apiClient';

export const postObjective = async (name: string) => {
  return await apiPost(API_OBJECTIVE(), {
    body: JSON.stringify({
      name,
      description: name,
    }),
  });
};
