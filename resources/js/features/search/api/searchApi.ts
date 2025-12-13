import axios from 'axios';
import App from '@/actions/App';
import type {
  Film,
  Person,
  SearchResult,
  SwapiResource,
} from '../types/types';
import { SearchData } from '../hooks/useLazySearch';

const { SearchController } = App.Http.Controllers.Api;

export const searchResource = async (
  resource: SwapiResource,
  query: string,
): Promise<SearchData> => {
  const route = SearchController.get({
    query: { resource, query },
  });

  const { data } = await axios<SearchResult<Person | Film>>(route);
  return data;
}
