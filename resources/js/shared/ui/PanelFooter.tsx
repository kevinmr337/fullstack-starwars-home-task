import { FC } from 'react';
import clsx from 'clsx';

type Props = { children: React.ReactNode; className?: string };

export const PanelFooter: FC<Props> = ({ children, className }) => (
  <div className={clsx('mb-[45px] md:mb-0', className)}>{children}</div>
);
