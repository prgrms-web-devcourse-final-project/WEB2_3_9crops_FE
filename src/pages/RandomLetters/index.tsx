import { useEffect, useState } from 'react';

import { getRandomLettersValid } from '@/apis/randomLetter';
import BackgroundBottom from '@/components/BackgroundBottom';
import PageTitle from '@/components/PageTitle';

import CoolTime from './components/CoolTime';
import Matched from './components/Matched';
import MatchedLetter from './components/MatchedLetter';
import MatchingSelect from './components/MatchingSelect';
import MatchingSelectModal from './components/MatchingSelectModal';

const RandomLettersPage = () => {
  const [openSelectModal, setOpenSelectModal] = useState<boolean>(false);
  const [openSelectedDetailModal, setOpenSelectedDetailModal] = useState<boolean>(false);
  const [matched, setMatched] = useState<boolean>(true); //setMatched 임시 제거
  const [coolTime, setCoolTime] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<RandomLetters>({
    letterId: 0,
    category: 'ETC',
    title: 'error',
    zipCode: 'error',
    paperType: 'BASIC',
    fontType: 'DEFAULT',
    createdAt: new Date(),
  });

  useEffect(() => {
    getRandomLettersValid();
  }, []);
  return (
    <>
      {openSelectedDetailModal ? (
        <MatchedLetter selectedLetter={selectedLetter} />
      ) : (
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
              <CoolTime setCoolTime={setCoolTime} />
            ) : !matched ? (
              <MatchingSelect
                setOpenModal={setOpenSelectModal}
                setSelectedLetter={setSelectedLetter}
              />
            ) : (
              <Matched setMatched={setMatched} setCoolTime={setCoolTime} />
            )}

            {openSelectModal && (
              <MatchingSelectModal
                setOpenModal={setOpenSelectModal}
                selectedLetter={selectedLetter}
                setOpenSelectedDetailModal={setOpenSelectedDetailModal}
              />
            )}
          </div>
          <BackgroundBottom />
        </>
      )}
    </>
  );
};

export default RandomLettersPage;
