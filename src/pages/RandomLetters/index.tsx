import { useState } from 'react';

import BackgroundBottom from '@/components/BackgroundBottom';
import PageTitle from '@/components/PageTitle';

import CoolTime from './components/CoolTime';
import Matched from './components/Matched';
import MatchingSelect from './components/MatchingSelect';
import MatchingSelectModal from './components/MatchingSelectModal';

const RandomLettersPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [matched] = useState<boolean>(false); //setMatched 임시 제거
  const [coolTime] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<RandomLetters>({
    letterId: 0,
    category: 'ETC',
    title: 'error',
    zipCode: 'error',
    createdAt: new Date(),
  });

  return (
    <>
      <div className="z-10 flex grow flex-col items-center overflow-hidden">
        <PageTitle className="mt-20">
          {coolTime
            ? '조금 뒤에 편지 매칭이 가능해요!'
            : !matched
              ? '답장하고 싶은 편지를 선택해주세요!'
              : '이미 답장 중인 편지가 있어요!'}
        </PageTitle>
        {coolTime ? (
          <CoolTime />
        ) : !matched ? (
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
