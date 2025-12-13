import { FC } from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ResponsivePanel: FC<Props> = ({ children, className }) => {
  return (
    <section
      className={clsx(
        `
          flex flex-col bg-white
          min-h-[calc(100dvh-56px)]
          overflow-hidden
          p-[15px]
          md:min-h-0
          md:overflow-visible
          md:rounded-[2px]
          md:border md:border-[#c4c4c4]
          md:shadow-[0_0.5px_1px_0_rgba(0,0,0,0.2)]
        `,
        className
      )}
    >
      {children}
    </section>
  );
};
