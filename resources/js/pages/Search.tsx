import React from 'react';
import { Head } from '@inertiajs/react';
import AppShell from '@/components/layout/App';
import { SearchContainer } from '@/features/search/components/SearchContainer';

const SearchPage: React.FC = () => {
  return (
    <>
      <Head title="SWStarter" />
      <AppShell>
        <div className="bg-[#ededed] min-h-[calc(100vh-49px)]">
          <div className="mx-auto md:mt-0 md:h-[450px] md:w-[720px] md:overflow-hidden">
            <SearchContainer />
          </div>
        </div>
      </AppShell>
    </>
  );
};

export default SearchPage;