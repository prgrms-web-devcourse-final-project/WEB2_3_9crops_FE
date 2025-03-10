import BgItem from '@/assets/images/field-4.png';

import BackgroundImageWrapper from './BackgroundImageWrapper';
import useThemeStore from '@/stores/themeStore';

const BackgroundBottom = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BackgroundImageWrapper
      as="div"
      className="fixed bottom-[-40px] left-1/2 z-[-10] h-42 w-full -translate-x-1/2 opacity-70"
      imageUrl={theme === 'light' ? BgItem : ''}
    />
  );
};

export default BackgroundBottom;
