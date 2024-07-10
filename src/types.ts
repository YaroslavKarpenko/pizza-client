export enum Pages {
  Home = '/',
  Products = '/products',
  About = '/about',
  Contacts = '/contact',
}

export enum Category {
  All = 'all',
  Neapolitan = 'neapolitan',
  Italian = 'italian',
  American = 'american',
  Canadian = 'canadian',
  Mexican = 'mexican',
}

export enum SortType {
  Name = 'name',
  Price = 'price',
  Rating = 'rating',
}

export enum Limit {
  Default = 3,
}

export interface FetchPizzaParams {
  category?: unknown;
  sort?: unknown;
  page?: unknown;
  search?: unknown;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface NewUserEntry {
  email: string;
  name: string;
  password: string;
}
