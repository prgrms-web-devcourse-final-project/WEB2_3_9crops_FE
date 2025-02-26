import homeLeftMountain from '@/assets/images/home-left-mountain.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';

const HomeBackgroundLeft = () => {
  return (
    <BackgroundImageWrapper
      as="div"
      className="absolute bottom-0 left-0 z-[11] h-[calc(var(--vh)*25)] w-full min-w-[700px] -translate-x-1/3"
      imageUrl={homeLeftMountain}
    />
  );
};

export default HomeBackgroundLeft;
