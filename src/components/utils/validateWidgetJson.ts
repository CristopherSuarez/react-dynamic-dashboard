import type { WidgetProps } from '../common/types';

export function validateWidgetJson(jsonData: unknown): WidgetProps[] | null {
  try {
    const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    const widgets = Array.isArray(parsed) ? parsed : [parsed];
    const isValid = widgets.every((w) =>
      typeof w.label === 'string' &&
      typeof w.type === 'string' &&
      w.query &&
      typeof w.query.quantity === 'number' &&
      typeof w.query.fields === 'object'
    );

    return isValid ? widgets : null;
  } catch {
    return null;
  }
}
