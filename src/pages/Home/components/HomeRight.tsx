import FloatingLetters from './FloatingLetters';
import GoToLetterBoard from './GoToLetterBoard';
import GoToLetterBox from './GoToLetterBox';
import NewLetterModal from './NewLetterModal';

const HomeRight = () => {
  //TODO : hasNewLetters 전역으로 상태 관리할지
  const hasNewLetters = true;

  return (
    <div className="flex h-screen w-full max-w-150 min-w-[300px] flex-shrink-0 grow snap-start flex-col items-center overflow-x-hidden pt-5">
      {hasNewLetters && <FloatingLetters />}
      <GoToLetterBox />
      <GoToLetterBoard />
      {hasNewLetters && <NewLetterModal />}
    </div>
  );
};

export default HomeRight;
