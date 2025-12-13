import { FC } from 'react';
import clsx from 'clsx';

type Props = { children: React.ReactNode; className?: string };

export const CenterWrap: FC<Props> = ({ children, className }) => (
  <div className={clsx('flex justify-center', className)}>{children}</div>
);
