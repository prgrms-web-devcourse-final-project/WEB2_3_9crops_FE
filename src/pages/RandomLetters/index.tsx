import { useState } from 'react';

import BackgroundBottom from '@/components/BackgroundBottom';
import PageTitle from '@/components/PageTitle';

import Matched from './Matched';
import MatchingSelect from './MatchingSelect';
import MatchingSelectModal from './MatchingSelectModal';

const RandomLettersPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [matched] = useState<boolean>(false); //setMatched 임시 제거
  const [selectedLetter, setSelectedLetter] = useState<SelectedLetter>({
    categoryName: 'ETC',
    title: 'error',
  });

  return (
    <>
      <div className="z-10 flex grow flex-col items-center overflow-hidden">
        <PageTitle className="mt-20">
          {!matched ? '답장하고 싶은 편지를 선택해주세요!' : '이미 답장 중인 편지가 있어요!'}
        </PageTitle>
        {!matched ? (
          <MatchingSelect setOpenModal={setOpenModal} setSelectedLetter={setSelectedLetter} />
        ) : (
          <Matched />
        )}
        {openModal && (
          <MatchingSelectModal setOpenModal={setOpenModal} selectedLetter={selectedLetter} />
        )}
      </div>
      <BackgroundBottom />
    </>
  );
};

export default RandomLettersPage;
