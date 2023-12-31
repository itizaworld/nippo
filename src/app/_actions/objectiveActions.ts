'use server';

import { redirect } from 'next/navigation';
import {
  API_OBJECTIVE,
  API_OBJECTIVE_ID,
  API_OBJECTIVE_ID_NIPPO,
  API_OBJECTIVE_ID_TASK,
  API_OBJECTIVE_ME,
  API_OBJECTIVE_SLUG,
} from '../_constants/apiUrls';
import { URLS } from '../_constants/urls';
import { Objective } from '~/domains/Objective';
import { apiGet, apiPost } from '~/libs/apiClient';
import { Nippo } from '~/domains/Nippo';
import { PaginationResult } from '~/domains/PaginationResult';
import { Task } from '~/domains/Task';

export const getObjectiveMe = async () => {
  return await apiGet<{ objective: Objective }>(API_OBJECTIVE_ME());
};

export const getObjective = async (_id: string) => {
  return await apiGet<{ objective: Objective }>(API_OBJECTIVE_ID(_id));
};

export const getObjectiveBySlug = async (slug: string) => {
  return await apiGet<{ objective: Objective }>(API_OBJECTIVE_SLUG(slug));
};

export const postObjective = async (name: string) => {
  return await apiPost<{ objective: Objective }>(API_OBJECTIVE(), {
    body: JSON.stringify({
      name,
      description: name,
    }),
  }).then((res) => {
    const { slug } = res.objective;
    redirect(URLS.SLUG(slug));
  });
};

export const getObjectiveNippos = async ({
  objectiveId,
  isMyObjective,
  page,
}: {
  objectiveId: string;
  isMyObjective: boolean;
  page: number;
}) => {
  return await apiGet<{ result: PaginationResult<Nippo> }>(`${API_OBJECTIVE_ID_NIPPO(objectiveId)}?page=${page}`, {
    // NOTE: 自分自身のデータを取得する場合はキャッシュを無効化する
    cache: isMyObjective ? 'no-store' : undefined,
    next: isMyObjective ? undefined : { revalidate: 60 },
  });
};

export const getObjectiveTasks = async ({ objectiveId, page }: { objectiveId: string; page: number }) => {
  return await apiGet<{ result: PaginationResult<Task> }>(`${API_OBJECTIVE_ID_TASK(objectiveId)}?page=${page}`, {
    cache: 'no-store',
  });
};
