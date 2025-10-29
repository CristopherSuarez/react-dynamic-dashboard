import type { FakerSchema } from '../../services/fakerService';

export interface WidgetJsonBody {
  label: string;
  type: string;
  query?: FakerSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}
