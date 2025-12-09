import { Color } from './Color';
export interface TimelineItem {
  title: string;
  icon: string;
  description?: null | string;
  date?: string | null;
  color?: Color | null;
}
