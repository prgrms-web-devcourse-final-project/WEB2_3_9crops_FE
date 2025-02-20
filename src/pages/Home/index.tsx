import HomeLeft from './components/HomeLeft';
import HomeRight from './components/HomeRight';
import NavBar from './components/NavBar';
import SpecialLetterBanner from './components/SpecialLetterBanner';
import LetterActions from './components/LetterActions';
import HomeButton from '@/components/HomeButton';

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen grow snap-x snap-mandatory overflow-x-auto overflow-y-hidden bg-cover">
      <NavBar />
      <SpecialLetterBanner />
      <LetterActions />
      <HomeLeft />
      <HomeRight />
      <HomeButton />
    </div>
  );
};

export default HomePage;
