'use server';

import { API_ME } from '../_constants/apiUrls';
import { User } from '~/domains/User';
import { apiGet } from '~/libs/apiClient';

export const fetchMe = async () => {
  return await apiGet<{ currentUser?: User }>(API_ME(), {
    next: { tags: [API_ME()] },
  });
};
