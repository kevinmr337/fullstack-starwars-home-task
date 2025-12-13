import { FC, useCallback, useState } from 'react';
import { SearchForm } from './SearchForm';
import { ResultsPanel } from './ResultsPanel';
import { PersonDetails } from './PersonDetails';
import { MovieDetails } from './MovieDetails';
import type { MobileScreen, SelectedEntity, SwapiResource } from '../types/types';
import { useLazySearch } from '../hooks/useLazySearch';
import { useSearchHeader } from '../hooks/useSearchHeader';
import { CenterWrap } from '@/shared/ui/CenterWrap';
import { DesktopStack } from '@/shared/ui/DesktopStack';

export const SearchContainer: FC = () => {
  const [resource, setResource] = useState<SwapiResource>('people');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedEntity>(null);
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>('form');

  const { data, isPending, isError, reset, mutate } = useLazySearch();

  const goToFormMobile = useCallback(() => {
    setSelected(null);
    setMobileScreen('form');
  }, []);

  const handleSearchSubmit = useCallback(
    (rawQuery: string) => {
      const trimmed = rawQuery.trim();
      if (!trimmed) return;

      setSelected(null);
      mutate({ resource, query: trimmed });
      setMobileScreen('results');
    },
    [mutate, resource]
  );

  const handleResourceChange = useCallback(
    (nextResource: SwapiResource) => {
      setResource(nextResource);
      setQuery('');
      setSelected(null);
      reset();
      setMobileScreen('form');
    },
    [reset]
  );

  const handleBackToSearch = useCallback(() => {
    setSelected(null);
    setMobileScreen('form');
  }, []);

  useSearchHeader({
    mobileScreen,
    isPending,
    hasSelected: !!selected,
    goToFormMobile,
  });

  if (selected) {
    return (
      <CenterWrap className="sm:mt-[0px] md:mt-[15px]">
        {selected.type === 'person' ? (
          <PersonDetails person={selected.person} onBack={handleBackToSearch} />
        ) : (
          <MovieDetails movie={selected.film} onBack={handleBackToSearch} />
        )}
      </CenterWrap>
    );
  }

  const form = (
    <SearchForm
      resource={resource}
      query={query}
      isLoading={isPending}
      onResourceChange={handleResourceChange}
      onQueryChange={setQuery}
      onSubmit={handleSearchSubmit}
    />
  );

  const results = (
    <ResultsPanel
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={data as any}
      isLoading={isPending}
      isError={isError}
      onSelectEntity={setSelected}
    />
  );

  return (
    <>
      <div className="md:hidden">
        {mobileScreen === 'form' ? form : results}
      </div>
      <div className="hidden md:block">
        <DesktopStack>
          {form}
          {results}
        </DesktopStack>
      </div>
    </>
  );
};