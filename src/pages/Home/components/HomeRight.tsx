import { useEffect } from 'react';

import { useIncomingLettersStore } from '@/stores/incomingLettersStore';

import FloatingLetters from './FloatingLetters';
import GoToLetterBoard from './GoToLetterBoard';
import GoToLetterBox from './GoToLetterBox';
import NewLetterModal from './NewLetterModal';

const HomeRight = () => {
  const { arrivedCount, fetchIncomingLetters } = useIncomingLettersStore();
  useEffect(() => {
    fetchIncomingLetters();
  }, [fetchIncomingLetters]);

  return (
    <div className="flex h-screen w-full max-w-150 min-w-[300px] flex-shrink-0 grow snap-start flex-col items-center overflow-x-hidden pt-5">
      {arrivedCount !== 0 && <FloatingLetters />}
      <GoToLetterBox />
      <GoToLetterBoard />
      {arrivedCount !== 0 && <NewLetterModal />}
    </div>
  );
};

export default HomeRight;
