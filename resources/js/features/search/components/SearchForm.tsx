import { ChangeEvent, FC, FormEvent, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { RadioTabs } from '@/components/ui/RadioTabs';
import { ResponsivePanel } from '@/shared/ui/ResponsivePanel';
import { PanelBody } from '@/shared/ui/PanelBody';
import { PanelFooter } from '@/shared/ui/PanelFooter';
import { SWAPI_RESOURCE } from '../constants/resources';
import type { SwapiResource } from '../types/types';

type Props = {
  resource: SwapiResource;
  query: string;
  isLoading: boolean;
  onResourceChange: (resource: SwapiResource) => void;
  onQueryChange: (value: string) => void;
  onSubmit: (query: string) => void;
};

export const SearchForm: FC<Props> = ({
  resource,
  query,
  isLoading,
  onResourceChange,
  onQueryChange,
  onSubmit,
}) => {
  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const isDisabled = trimmedQuery.length === 0 || isLoading;
  const buttonLabel = isLoading ? 'Searching…' : 'Search'

  const placeholder =
    resource === 'people'
      ? 'e.g. Chewbacca, Yoda, Boba Fett'
      : 'e.g. A New Hope, The Empire Strikes Back';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isDisabled) return;
    onSubmit(trimmedQuery);
  };

  const handleResourceChange = (newResource: SwapiResource) => {
    if (isLoading) return;
    onResourceChange(newResource);
    onQueryChange('');
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <ResponsivePanel>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col min-h-0">
        <PanelBody>
          <p className="mb-[10px] font-montserrat text-[7px] font-semibold text-slate-800">
            What are you searching for?
          </p>

          <RadioTabs
            name="resource"
            value={resource}
            options={[
              { value: SWAPI_RESOURCE.PEOPLE, label: 'People' },
              { value: SWAPI_RESOURCE.FILMS, label: 'Movies' },
            ]}
            onChange={handleResourceChange}
          />

          <div className="my-[10px]">
            <TextInput
              value={query}
              onChange={handleQueryChange}
              placeholder={placeholder}
              disabled={isLoading}
              autoFocus
            />
          </div>
        </PanelBody>
        <PanelFooter>
          <Button
            type="submit"
            fullWidth
            disabled={isDisabled}
            forcePrimaryWhenDisabled={isLoading}
          >
            {buttonLabel}
          </Button>
        </PanelFooter>
      </form>
    </ResponsivePanel>
  );
};
