import type { FakerResourceType } from './fakerResources';

/**
 * Base URL for the Faker API
 * @see https://fakerapi.it/en
 */
const BASE_URL = 'https://fakerapi.it/api/v1';

// Parameters accepted by the fetchFakerData function
interface FetchFakerParams {
  endpoint: FakerResourceType;
  quantity?: number;
}

/**
 * Fetches mock data from the Faker API.
 *
 * @async
 * @function fetchFakerData
 * @param {FetchFakerParams} params - The parameters for fetching data.
 * @param {FakerResourcesType} params.endpoint - The specific Faker API endpoint.
 * @param {number} [params.quantity=20] - The number of items to retrieve.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of fake data.
 *
 * @example
 * ```ts
 * const users = await fetchFakerData({ endpoint: "users", quantity: 10 });
 * console.log(users);
 * ```
 */
export async function fetchFakerData({ endpoint, quantity = 20 }: FetchFakerParams): Promise<Record<string, string|[]>[]> {
  const response = await fetch(`${BASE_URL}/${endpoint}?_quantity=${quantity}`);
  const data = await response.json();
  return data.data || [];
}
