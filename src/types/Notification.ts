import { RouteLocationRaw } from 'vue-router';

interface Notification {
  id: string;
  text: string;
  to?: RouteLocationRaw;
  created_at?: string;
}

export { Notification };
