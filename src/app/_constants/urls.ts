const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const URLS = {
  TOP: '/',
  NOTE_NEW: '/notes/new',
  OBJECTIVE: (id: string) => `/objectives/${id}`,
  TERM: `${frontUrl}/terms`,
  POLICY: `${frontUrl}/policy`,
  LOGIN_TO_BACKEND: `${serverUrl}/auth/google`,
};
