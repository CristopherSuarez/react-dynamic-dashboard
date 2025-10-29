import { FakerResources } from './fakerResources';

const BASE_URL = 'https://fakerapi.it/api/v1';

export interface FakerSchema {
  quantity?: number;
  fields: Record<string, string>;
}

/**
 * Builds a query string for FakerAPI/custom endpoint.
 * Converts schema fields into query parameters automatically.
 *
 * @param {FakerSchema} schema - The schema containing quantity and fields.
 * @returns {Promise<any[]>} - Generated fake data.
 *
 * @example
 * await fetchCustomFakerData({
 *   quantity: 3,
 *   fields: { group: "word", value1: "number" }
 * });
 */
export async function fetchCustomFakerData(schema: FakerSchema): Promise<[]> {
  const params = new URLSearchParams();
  if (schema.quantity) params.append('_quantity', String(schema.quantity));
  if (schema.fields) {
    for (const [key, val] of Object.entries(schema.fields)) {
      params.append(key, val);
    }
  }

  const url = `${BASE_URL}/${FakerResources.CUSTOM}?${params.toString()}`;
  const res = await fetch(url);
  const json = await res.json();

  return json.data || [];
}
