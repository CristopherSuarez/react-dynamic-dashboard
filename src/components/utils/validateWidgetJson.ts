import type { WidgetProps } from '../../types/types';

/**
 * Parses and validates a JSON structure representing one or more widgets
 *
 * This utility ensures that the provided data has the minimal structure
 * required for widget configuration, including basic type checks for
 * common widget properties
 *
 * @param jsonData - JSON string or object containing widget definitions
 * @returns An array of validated widgets, or `null` if invalid
 */
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
