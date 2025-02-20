import { useState } from 'react';

import BackgroundBottom from '@/components/BackgroundBottom';
import PageTitle from '@/components/PageTitle';

import Matched from './Matched';
import MatchingSelect from './MatchingSelect';
import MatchingSelectModal from './MatchingSelectModal';

const RandomLettersPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [matched, setMatched] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<SelectedLetter>({
    stampName: '기타',
    title: 'error',
  });

  return (
    <>
      <div className="flex grow flex-col items-center overflow-hidden">
        <PageTitle className="mt-20">
          {!matched ? '답장하고 싶은 편지를 선택해주세요!' : '이미 답장 중인 편지가 있어요!'}
        </PageTitle>
        {!matched ? (
          <MatchingSelect setOpenModal={setOpenModal} setSelectedLetter={setSelectedLetter} />
        ) : (
          <Matched />
        )}
        <BackgroundBottom />
        {openModal && (
          <MatchingSelectModal setOpenModal={setOpenModal} selectedLetter={selectedLetter} />
        )}
      </div>
    </>
  );
};

export default RandomLettersPage;
