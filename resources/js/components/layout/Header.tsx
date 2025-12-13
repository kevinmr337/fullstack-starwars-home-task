import React from 'react';
import { useUI } from '@/shared/providers/UIContext';


export const Header: React.FC = () => {
  const { header } = useUI();

  return (
    <header
      className="
        w-full bg-white border-b
        border-[#0ab463] md:border-[#c4c4c4]
      "
    >
      <div className="relative mx-auto flex items-center justify-center px-4 py-[16px] md:py-3">
        {header.showMobileBack && header.onMobileBack && (
          <button
            type="button"
            onClick={header.onMobileBack}
            className="absolute left-4 md:hidden text-[#0ab463] cursor-pointer"
            aria-label="Back"
          >
            ←
          </button>
        )}

        <span
          className="
            font-montserrat font-bold tracking-normal text-[#0ab463]
            text-[14px] md:text-[9px]
          "
        >
          {header.title}
        </span>
      </div>
    </header>
  );
};