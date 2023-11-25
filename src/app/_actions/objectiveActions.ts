'use server';

import { redirect } from 'next/navigation';
import { API_OBJECTIVE, API_OBJECTIVE_ID, API_OBJECTIVE_ID_NIPPO, API_OBJECTIVE_ME } from '../_constants/apiUrls';
import { URLS } from '../_constants/urls';
import { Objective } from '~/domains/Objective';
import { apiGet, apiPost } from '~/libs/apiClient';
import { Nippo } from '~/domains/Nippo';

export const getObjectiveMe = async () => {
  return await apiGet<{ objective: Objective }>(API_OBJECTIVE_ME());
};

export const getObjective = async (_id: string) => {
  return await apiGet<{ object: Objective }>(API_OBJECTIVE_ID(_id));
};

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

export const getObjectiveNippos = async ({ objectiveId, isMyObjective }: { objectiveId: string; isMyObjective: boolean }) => {
  return await apiGet<{ nippos: Nippo[] }>(API_OBJECTIVE_ID_NIPPO(objectiveId), {
    // NOTE: 自分自身のデータを取得する場合はキャッシュを無効化する
    cache: isMyObjective ? 'no-store' : undefined,
    next: { revalidate: 60 },
  });
};
