import FloatingLetters from './FloatingLetters';
import GoToLetterBoard from './GoToLetterBoard';
import GoToLetterBox from './GoToLetterBox';
import NewLetterModal from './NewLetterModal';

const HomeRight = () => {
  //TODO : hasNewLetters 전역으로 상태 관리할지
  let hasNewLetters = true;

  return (
    <div className="relative flex h-screen w-full max-w-[800px] flex-shrink-0 grow snap-start flex-col justify-between overflow-x-hidden pt-5">
      {hasNewLetters ? <FloatingLetters /> : null}
      <GoToLetterBox />
      <GoToLetterBoard />
      {hasNewLetters ? <NewLetterModal /> : null}
      <img
        src="/src/assets/home_right_mountain_bottom.png"
        alt="home right mountain bottom"
        className="absolute bottom-0 z-10 w-full"
      />
      <img
        src="/src/assets/home_right_mountain_top.png"
        alt="home right mountain top"
        className="absolute bottom-0 w-full"
      />
    </div>
  );
};

export default HomeRight;
