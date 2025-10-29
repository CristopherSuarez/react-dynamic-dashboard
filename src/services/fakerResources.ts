export const FakerResources = {
  // Custom endpoint to query params
  CUSTOM: 'custom',
} as const;

export type FakerResourceType = (typeof FakerResources)[keyof typeof FakerResources];

export const SIMPLE_FAKER_TYPES = [
  'boolean',
  'firstName',
  'lastName',
  'email',
  'city',
  'country',
  'company_name',
  'phone',
  'word',
  'number',
  'uuid',
];

export type SimpleFakerType = typeof SIMPLE_FAKER_TYPES[number];
