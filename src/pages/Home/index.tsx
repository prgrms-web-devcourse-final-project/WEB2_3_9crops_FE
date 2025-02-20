import HomeLeft from './components/HomeLeft';
import HomeRight from './components/HomeRight';
import HomeHeader from './components/HomeHeader';
import SpecialLetterBanner from './components/SpecialLetterBanner';
import LetterActions from './components/LetterActions';
import HomeButton from '@/components/HomeButton';
import HomeBackgroundLeft from './components/HomeBackgroundLeft';
import HomeBackgroundRightBottom from './components/HomeBackgroundRightBottom';
import HomeBackgroundRightTop from './components/HomeBackgroundRightTop';
import useViewport from '@/hooks/useViewport';

const HomePage = () => {
  useViewport();
  return (
    <div className="relative h-[calc(var(--vh)*100)] w-full overflow-hidden">
      <HomeHeader />
      <SpecialLetterBanner />
      <LetterActions />

      <div className="flex h-full w-screen snap-x snap-mandatory flex-nowrap overflow-x-auto overflow-y-hidden bg-cover">
        <section className="relative h-full min-w-screen snap-center">
          <HomeLeft />
          <HomeBackgroundLeft />
        </section>

        <section className="relative h-full min-w-screen snap-center">
          <HomeRight />
          <HomeBackgroundRightBottom />
          <HomeBackgroundRightTop />
        </section>
      </div>

      <HomeButton />
    </div>
  );
};

export default HomePage;
