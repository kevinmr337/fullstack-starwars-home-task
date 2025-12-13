import { FC } from 'react';
import { Button } from '@/components/ui/Button';
import { EmptyMatches } from './EmptyMatches';
import { LoadingMatches } from './LoadingMatches';
import type { SelectedEntity, Person, Film } from '../types/types';
import { useUI } from '@/shared/providers/UIContext';

type Props = {
  isLoading: boolean;
  isError: boolean;
  data: { results: (Person | Film)[] } | null;
  onSelectEntity: (entity: SelectedEntity) => void;
};

const isPerson = (item: Person | Film): item is Person => 'birth_year' in item;

export const ResultsPanel: FC<Props> = ({
  isLoading,
  isError,
  data,
  onSelectEntity,
}) => {
  const hasResults = !!data && data.results.length > 0;
  const { header } = useUI();

  return (
    <section
      className="
        flex flex-col bg-white
        min-h-[calc(100dvh-56px)]
        px-[15px] pt-[15px]
        md:min-h-0
        md:w-[291px]
        md:min-h-[291px]
        md:px-[15px]
        md:pt-[15px]
        md:rounded-[2px]
        md:border md:border-[#c4c4c4]
        md:shadow-[0_0.5px_1px_0_rgba(0,0,0,0.2)]
      "
    >
      <div className="mb-1 shrink-0">
        <h2 className="font-montserrat text-[11px] font-bold text-slate-900">
          Results
        </h2>
        <div className="mt-2 h-px w-full bg-[#c4c4c4]" />
      </div>
      <div className="flex flex-1 min-h-0 flex-col overflow-y-auto">
        {isLoading && <LoadingMatches />}

        {!isLoading && isError && (
          <div className="flex flex-1 items-center justify-center px-6 text-center">
            <p className="font-montserrat text-[11px] text-red-500">
              Something went wrong. Please try again.
            </p>
          </div>
        )}
        {!isLoading && !isError && !hasResults && <EmptyMatches />}

        {!isLoading && !isError && hasResults && (
          <div className="w-full space-y-2">
            {data!.results.map((item) => (
              <div
                key={isPerson(item) ? item.name : item.title}
                className="
                  flex flex-col gap-[6px]
                  border-b border-slate-200 py-3
                  md:flex-row md:items-center md:justify-between md:gap-0
                "
              >
                <span className="font-montserrat text-[10px] font-bold text-slate-900">
                  {isPerson(item) ? item.name : item.title}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full md:w-auto"
                  onClick={() =>
                    onSelectEntity(
                      isPerson(item)
                        ? { type: 'person', person: item }
                        : { type: 'film', film: item }
                    )
                  }
                >
                  See details
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {header.onMobileBack && !isLoading && (
        <div className="mt-[20px] pb-[45px] md:hidden">
          <Button fullWidth variant="primary" onClick={header.onMobileBack}>
            Back to search
          </Button>
        </div>
      )}
    </section>
  );
};
