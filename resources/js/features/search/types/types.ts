import { SWAPI_RESOURCE } from "../constants/resources";


export type SwapiResource = typeof SWAPI_RESOURCE[keyof typeof SWAPI_RESOURCE];

export type Person = {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: string[];
};

export type Film = {
  title: string;
  opening_crawl: string;
  characters: string[];
};

export type SearchResult<T> = {
  count: number;
  results: T[];
};

export type SearchStateResource = SwapiResource;

export type SelectedEntity =
  | { type: 'person'; person: Person }
  | { type: 'film'; film: Film }
  | null;

export type MobileScreen = 'form' | 'results';