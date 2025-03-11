import homeRightMountainBottom from '@/assets/images/home-right-mountain-bottom.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';

const HomeBackgroundRightBottom = () => {
  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 z-10 h-[20%] w-full min-w-[600px] -translate-x-1/4 overflow-hidden md:w-[920px]"
      imageUrl={homeRightMountainBottom}
    />
  );
};

export default HomeBackgroundRightBottom;
