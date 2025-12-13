import React from 'react';
import { Header } from './Header';
import { UIProvider } from '@/shared/providers/UIContext';


type AppShellProps = { children: React.ReactNode };

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <UIProvider>
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        <main className="w-full flex-1">{children}</main>
      </div>
    </UIProvider>
  );
};

export default AppShell;