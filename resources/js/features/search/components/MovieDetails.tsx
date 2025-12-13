import { FC } from 'react';
import { Button } from '@/components/ui/Button';
import type { Film } from '../types/types';

type Props = {
  movie: Film;
  onBack: () => void;
};

export const MovieDetails: FC<Props> = ({ movie, onBack }) => {
  return (
    <section
      className="
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
          {movie.title}
        </h2>
      </div>
      <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-10">
        <div className="md:w-1/2">
          <h3 className="mb-1 font-montserrat text-[10px] font-bold text-slate-900">
            Opening Crawl
          </h3>
          <div className="h-px w-full bg-slate-200" />
          <p className="mt-2 font-montserrat text-[9px] text-slate-900 leading-snug whitespace-pre-line">
            {movie.opening_crawl}
          </p>
        </div>
        <div className="md:w-1/2">
          <h3 className="mb-1 mt-4 font-montserrat text-[10px] font-bold text-slate-900 md:mt-0">
            Characters
          </h3>
          <div className="h-px w-full bg-slate-200" />
          <p className="mt-2 font-montserrat text-[9px] text-blue-500 leading-snug">
            {movie.characters.map((characterUrl, index) => (
              <span
                key={characterUrl}
                className="cursor-pointer hover:underline"
                onClick={() => console.log('Character clicked:', characterUrl)}
              >
                {characterUrl}
                {index < movie.characters.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="mt-auto pb-[45px] md:mt-10 md:pb-0 flex justify-left">
        <Button size="compact" variant="primary" onClick={onBack}>
          Back to search
        </Button>
      </div>
    </section>
  );
};
