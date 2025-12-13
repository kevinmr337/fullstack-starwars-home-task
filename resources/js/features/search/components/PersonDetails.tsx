import { FC } from 'react';
import { Button } from '@/components/ui/Button';
import type { Person } from '../types/types';

type Props = {
  person: Person;
  onBack: () => void;
};

export const PersonDetails: FC<Props> = ({ person, onBack }) => {
  return (
    <section
      className="
        w-full
        flex flex-col bg-white
        min-h-[calc(100dvh-56px)]
        px-[15px] pt-[15px]
        md:min-h-0
        md:rounded-sm
        md:border md:border-[#c4c4c4]
        md:px-[15px] md:py-[15px]
        md:shadow-sm md:shadow-slate-200
        md:w-[420px]
      "
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-montserrat text-[11px] font-bold text-slate-900">
          {person.name}
        </h2>
      </div>
      <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-10">
        <div className="md:w-1/2">
          <h3 className="mb-1 font-montserrat text-[10px] font-bold text-slate-900">
            Details
          </h3>
          <div className="h-px w-full bg-slate-200" />
          <p className="mt-2 font-montserrat text-[9px] text-slate-900 leading-snug">
            Birth Year: {person.birth_year}
            <br />
            Gender: {person.gender}
            <br />
            Eye Color: {person.eye_color}
            <br />
            Hair Color: {person.hair_color}
            <br />
            Height: {person.height}
            <br />
            Mass: {person.mass}
          </p>
        </div>

        <div className="md:w-1/2">
          <h3 className="mb-1 mt-4 font-montserrat text-[10px] font-bold text-slate-900 md:mt-0">
            Movies
          </h3>
          <div className="h-px w-full bg-slate-200" />
          <p className="mt-2 font-montserrat text-[9px] text-blue-500 leading-snug">
            {person.films.map((filmUrl, index) => (
              <span
                key={filmUrl}
                className="cursor-pointer hover:underline"
                onClick={() => console.log('Film clicked:', filmUrl)}
              >
                {filmUrl}
                {index < person.films.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="mt-auto pb-[45px] md:mt-10 md:pb-0 flex justify-left">
        <Button
          size="compact"
          variant="primary"
          onClick={onBack}
          className="w-full md:w-auto"
        >
          Back to search
        </Button>
      </div>
    </section>
  );
};
