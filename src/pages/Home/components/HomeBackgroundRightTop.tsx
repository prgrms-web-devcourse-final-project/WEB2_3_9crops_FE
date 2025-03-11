import homeRightMountainTop from '@/assets/images/home-right-mountain-top.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
const HomeBackgroundRightTop = () => {
  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 z-8 h-[35%] w-full min-w-[760px] -translate-x-1/4 overflow-hidden md:w-[1200px]"
      imageUrl={homeRightMountainTop}
    />
  );
};

export default HomeBackgroundRightTop;
