// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FakerResources = {
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
} as const;

export type FakerResourceType = (typeof FakerResources)[keyof typeof FakerResources];
