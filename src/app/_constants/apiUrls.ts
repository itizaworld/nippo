// User
export const API_ME = () => `/api/me`;

export const API_OBJECTIVE = () => `/api/objectives`;
export const API_OBJECTIVE_ID = (_id: string) => `/api/objectives/${_id}`;
export const API_OBJECTIVE_SLUG = (slug: string) => `/api/objectives/slug/${slug}`;
export const API_OBJECTIVE_ME = () => `/api/objectives/me`;

export const API_OBJECTIVE_ID_NIPPO = (_id: string) => `/api/objectives/${_id}/nippos`;
export const API_NIPPO_BY_DATE = (slug: string, data: string) => `/api/nippos/by-date?date=${data}&slug=${slug}`;

export const API_TASK = () => `/api/tasks`;
export const API_TASK_ID = (id: string) => `/api/tasks/${id}`;
