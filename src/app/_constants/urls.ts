const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const URLS = {
  TOP: '/',
  NOTE_NEW: '/notes/new',
  LOGIN_TO_BACKEND: `${serverUrl}/auth/google`,
};
