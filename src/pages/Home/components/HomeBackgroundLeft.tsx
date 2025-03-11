import homeLeftMountain from '@/assets/images/home-left-mountain.webp';
import homeLeftMountainDark from '@/assets/images/home-left-mountain-dark.webp';

import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import useThemeStore from '@/stores/themeStore';

const HomeBackgroundLeft = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 left-0 z-[11] h-[calc(var(--vh)*25)] w-full min-w-[700px] -translate-x-1/3"
      imageUrl={theme === 'light' ? homeLeftMountain : homeLeftMountainDark}
    />
  );
};

export default HomeBackgroundLeft;
