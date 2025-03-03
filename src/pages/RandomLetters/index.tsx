import { useEffect, useState } from 'react';

import { getRandomLetterCoolTime, getRandomLetterMatched } from '@/apis/randomLetter';
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
  const [isMatched, setIsMatched] = useState<boolean>(false); //setMatched 임시 제거
  const [isCoolTime, setIsCoolTime] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<RandomLetters>({
    letterId: 0,
    category: 'ETC',
    title: 'error',
    zipCode: 'error',
    paperType: 'BASIC',
    fontType: 'DEFAULT',
    createdAt: new Date(),
  });
  const [coolTime, setCoolTime] = useState<CoolTime>({
    lastMatchedAt: new Date(),
  });

  const handleGetRandomLetterMatched = async () => {
    const res = await getRandomLetterMatched();
    if (res?.status === 200) {
      const data: MatchedData = res.data.data;
      if (data?.temporary === true) {
        setIsMatched(true);
        setSelectedLetter({
          letterId: data.letterId,
          category: data.category,
          title: data.title,
          zipCode: data.zipCode,
          paperType: data.paperType,
          fontType: data.fontType,
          createdAt: data.createdAt,
        });
      }
    }
  };

  const handleGetRandomLetterCoolTime = async () => {
    const res = await getRandomLetterCoolTime();
    console.log(res);
    if (res?.status === 200) {
      const data: CoolTimeData = res.data.data;
      if (data?.canSend === false) {
        setIsCoolTime(true);
        setCoolTime({ lastMatchedAt: data.lastMatchedAt });
      }
    } else {
      console.log('?');
    }
  };

  useEffect(() => {
    // MEMO : 임시매칭완료 여부(validTable), 매칭완료 여부(valid) api 연결되면 res값 받아서 matched, coolTime에 값 넣어주기
    handleGetRandomLetterMatched();
    handleGetRandomLetterCoolTime();
  }, []);
  return (
    <>
      {openSelectedDetailModal ? (
        <MatchedLetter selectedLetter={selectedLetter} />
      ) : (
        <>
          <div className="z-10 flex grow flex-col items-center overflow-hidden">
            <PageTitle className="mt-20">
              {isCoolTime
                ? '조금 뒤에 편지 매칭이 가능해요!'
                : !isMatched
                  ? '답장하고 싶은 편지를 선택해주세요!'
                  : '이미 답장 중인 편지가 있어요!'}
            </PageTitle>
            {isCoolTime ? (
              <CoolTime setIsCoolTime={setIsCoolTime} coolTime={coolTime} />
            ) : !isMatched ? (
              <MatchingSelect
                setOpenModal={setOpenSelectModal}
                setSelectedLetter={setSelectedLetter}
              />
            ) : (
              <Matched
                selectedLetter={selectedLetter}
                setIsMatched={setIsMatched}
                setIsCoolTime={setIsCoolTime}
              />
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
