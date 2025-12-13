import React from 'react';
import clsx from 'clsx';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: React.FC<TextInputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={clsx(
        `
          block
          w-full
          pl-[5px]
          min-w-[175px]
          py-[5.5px]
          rounded-[2px]
          shadow-[inset_0_0.5px_1.5px_0_rgba(0,0,0,0.15)]
          border border-[#c4c4c4]
          bg-white
          text-[7px]
          leading-none
          font-montserrat font-bold
          placeholder:text-[#c4c4c4]
          focus:outline-none
        `,
        className,
      )}
      {...rest}
    />
  );
};