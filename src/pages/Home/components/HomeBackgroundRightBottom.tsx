import homeRightMountainBottom from '@/assets/images/home-right-mountain-bottom.png';
import homeRightMountainBottomDark from '@/assets/images/home-right-mountain-bottom-dark.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import useThemeStore from '@/stores/themeStore';

const HomeBackgroundRightBottom = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 z-[10] h-[calc(var(--vh)*20)] w-full min-w-[600px] -translate-x-1/4 overflow-hidden"
      imageUrl={theme === 'light' ? homeRightMountainBottom : homeRightMountainBottomDark}
    />
  );
};

export default HomeBackgroundRightBottom;
