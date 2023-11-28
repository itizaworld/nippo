const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const URLS = {
  TOP: '/',
  NOTE_NEW: '/notes/new',
  SLUG: (slug: string) => `/${slug}`,
  SLUG_DATE: (slug: string, date: string) => `/${slug}/${date}`,
  TERM: `${frontUrl}/terms`,
  POLICY: `${frontUrl}/policy`,
  LOGIN_TO_BACKEND: `${serverUrl}/auth/google`,
};
