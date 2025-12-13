import React from 'react';

export const EmptyMatches: React.FC = () => (
  <div className="flex w-full flex-1 items-center justify-center px-6 text-center">
    <p className="font-montserrat text-[7px] font-bold text-[#c4c4c4]">
      There are zero matches.
      <br />
      Use the form to search for People or Movies.
    </p>
  </div>
);
