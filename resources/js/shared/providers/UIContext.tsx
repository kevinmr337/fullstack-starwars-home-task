import { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react';

type HeaderState = {
  title: string;
  showMobileBack: boolean;
  onMobileBack: (() => void) | null;
};

type UIContextValue = {
  header: HeaderState;
  setHeader: (next: Partial<HeaderState>) => void;
  resetHeader: () => void;
};

const DEFAULT_HEADER: HeaderState = {
  title: 'SWStarter',
  showMobileBack: false,
  onMobileBack: null,
};

const UIContext = createContext<UIContextValue | null>(null);

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [header, setHeaderState] = useState<HeaderState>(DEFAULT_HEADER);

  const value = useMemo<UIContextValue>(() => {
    return {
      header,
      setHeader: (next) => setHeaderState((prev) => ({ ...prev, ...next })),
      resetHeader: () => setHeaderState(DEFAULT_HEADER),
    };
  }, [header]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
