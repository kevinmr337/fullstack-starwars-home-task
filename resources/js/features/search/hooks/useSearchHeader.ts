import { useEffect } from 'react';
import { useUI } from '@/shared/providers/UIContext';

type Args = {
  mobileScreen: 'form' | 'results';
  isPending: boolean;
  hasSelected: boolean;
  goToFormMobile: () => void;
};

export const useSearchHeader = ({
  mobileScreen,
  isPending,
  hasSelected,
  goToFormMobile,
}: Args) => {
  const { setHeader, resetHeader } = useUI();

  useEffect(() => {
    setHeader({ title: 'SWStarter' });

    const shouldShowBack =
      mobileScreen === 'results' && !hasSelected && !isPending;

    setHeader({
      showMobileBack: shouldShowBack,
      onMobileBack: shouldShowBack ? goToFormMobile : null,
    });

    return () => resetHeader();
  }, [mobileScreen, isPending, hasSelected, goToFormMobile, resetHeader, setHeader]);
};
