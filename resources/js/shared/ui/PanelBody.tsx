import { FC } from 'react';
import clsx from 'clsx';

type Props = { children: React.ReactNode; className?: string };

export const PanelBody: FC<Props> = ({ children, className }) => (
  <div className={clsx('flex-1 overflow-y-auto min-h-0', className)}>
    {children}
  </div>
);
