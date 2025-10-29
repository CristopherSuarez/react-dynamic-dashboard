import type { FakerSchema } from '../../services/fakerService';

export interface WidgetProps {
  id?: unknown;
  label: string;
  direction?: 'horizontal' | 'vertical';
  type: string;
  color: string;
  iconColor: string;
  query: FakerSchema;
}
