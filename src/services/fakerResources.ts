export const FakerResources = {
  ADDRESSES: 'addresses',
  BOOKS: 'books',
  COMPANIES: 'companies',
  CREDIT_CARDS: 'creditCards',
  IMAGES: 'images',
  PERSONS: 'persons',
  PLACES: 'places',
  PRODUCTS: 'products',
  TEXTS: 'texts',
  USERS: 'users',

  // Custom endpoint to query params
  CUSTOM: 'custom',
} as const;

export type FakerResourceType = (typeof FakerResources)[keyof typeof FakerResources];
