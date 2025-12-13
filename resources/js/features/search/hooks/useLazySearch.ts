import { useMutation } from '@tanstack/react-query';
import { searchResource } from '../api/searchApi';
import type {
  SwapiResource,
  SearchResult,
  Person,
  Film,
} from '../types/types';

export type SearchPayload = {
  resource: SwapiResource;
  query: string;
};

export type SearchData = SearchResult<Person | Film>;

export const useLazySearch = () => {
  return useMutation<SearchData, Error, SearchPayload>({
    mutationKey: ['swapi-search'],
    mutationFn: ({ resource, query }) => searchResource(resource, query),
  });
};