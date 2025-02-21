import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import homeRightMountainBottom from '@/assets/images/home-right-mountain-bottom.png';
const HomeBackgroundRightBottom = () => {
  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 z-[10] h-[calc(var(--vh)*20)] w-full min-w-[600px] -translate-x-1/4 overflow-hidden"
      imageUrl={homeRightMountainBottom}
    />
  );
};

export default HomeBackgroundRightBottom;
