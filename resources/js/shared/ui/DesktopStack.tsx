import { FC } from 'react';

type Props = { children: React.ReactNode };

export const DesktopStack: FC<Props> = ({ children }) => (
  <div className="mt-[15px] flex justify-center">
    <div className="flex flex-col gap-[15px] md:flex-row md:items-start">
      {children}
    </div>
  </div>
);
