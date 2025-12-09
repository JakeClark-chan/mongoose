import { Status } from './Status';

export interface StepperItem {
  title: string;
  description?: string | null;
  stepNumber: number;
  status: Status;
}
