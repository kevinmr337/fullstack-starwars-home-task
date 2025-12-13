import clsx from 'clsx';

export type RadioTabOption<T extends string> = {
  value: T;
  label: string;
};

type RadioTabsProps<T extends string> = {
  name: string;
  value: T;
  options: RadioTabOption<T>[];
  onChange: (value: T) => void;
};

export const RadioTabs = <T extends string>({
  name,
  value,
  options,
  onChange,
}: RadioTabsProps<T>) => {
  return (
    <div className="flex items-center gap-[15px]">
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-[5px] select-none block leading-none"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              className="sr-only"
              checked={checked}
              onChange={() => onChange(opt.value)}
            />
            <span
              className={clsx(
                'inline-flex items-center justify-center rounded-full transition-colors',
                checked ? 'bg-[#0094ff] p-[3px]' : 'border-[0.5px] border border-[#c4c4c4] p-[3.5px]',
              )}
            >
              <span
                className={clsx(
                  'bg-white rounded-full',
                  checked ? 'p-[1px]' : 'opacity-0',
                )}
              />
            </span>
            <span className="font-montserrat text-[7px] font-bold text-[#000]">
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
