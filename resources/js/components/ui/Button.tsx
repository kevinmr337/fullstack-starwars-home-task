import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary';
  size?: 'md' | 'sm' | 'compact';
  fullWidth?: boolean;
  forcePrimaryWhenDisabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  forcePrimaryWhenDisabled = false,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center text-white font-bold uppercase tracking-normal transition-colors cursor-pointer disabled:cursor-not-allowed';

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    md: 'rounded-full text-[7px] px-10 py-1 leading-[1.2]',
    sm: 'rounded-[10px] px-[10px] py-[4px] text-[7px] leading-[1.2]',
    compact: 'rounded-[10px] px-[14px] py-[4px] text-[7px] leading-[1.2]',
  };

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-[#0ab463] hover:bg-[#078f4f] border border-[#0ab463]',
  };

  const disabledStyles = 'disabled:bg-[#c4c4c4] disabled:border-[#c4c4c4]';
  const appliedDisabledStyles = forcePrimaryWhenDisabled ? '' : disabledStyles;

  return (
    <button
      disabled={disabled}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        appliedDisabledStyles,
        'w-full',
        fullWidth ? 'md:w-full' : 'md:w-auto',

        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};