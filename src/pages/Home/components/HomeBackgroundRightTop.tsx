import homeRightMountainTop from '@/assets/images/home-right-mountain-top.png';
import homeRightMountainTopDark from '@/assets/images/home-right-mountain-top-dark.png';

import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import useThemeStore from '@/stores/themeStore';

const HomeBackgroundRightTop = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 z-8 h-[35%] w-full min-w-[760px] -translate-x-1/4 overflow-hidden md:w-[1200px]"
      imageUrl={theme === 'light' ? homeRightMountainTop : homeRightMountainTopDark}
    />
  );
};

export default HomeBackgroundRightTop;
