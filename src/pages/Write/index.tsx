import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getPrevLetter } from '@/apis/write';
import useWrite from '@/stores/writeStore';

import CategorySelect from './CategorySelect';
import { PAPER_TYPE_OBJ } from './constants';
import LetterEditor from './LetterEditor';

const WritePage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const letterId = searchParams.get('letterId');

  const [send, setSend] = useState<boolean>(false);
  const [step, setStep] = useState<Step>('edit');
  const [prevLetter, setPrevLetter] = useState<PrevLetter[]>([]);
  const [isReply, setIsReply] = useState<boolean>(false);

  const letterRequest = useWrite((state) => state.letterRequest);
  const resetLetterRequest = useWrite((state) => state.resetLetterRequest);

  const wrapStyle = twMerge(
    'relative p-5 w-full grow flex flex-col',
    `${step === 'edit' && PAPER_TYPE_OBJ[letterRequest.paperType]}`,
  );

  useEffect(() => {
    // MEMO : letterId는 쿼리파라미터를 통해 얻을수 있음 => 최초답장, 답장만 prevLetter을 받는 로직을 실행함
    if (!letterId) return;
    if (location.state?.randomMatched) {
      const matchedLetter: MatchedLetter = location.state?.matchedLetter;
      const matchedPrevLetter: PrevLetter = {
        letterId: matchedLetter.letterId,
        title: matchedLetter.title,
        content: matchedLetter.content,
        category: matchedLetter.category,
        memberId: matchedLetter.writerId,
        matchingId: null,
      };
      setPrevLetter([matchedPrevLetter]);
    } else {
      const handleGetPrevLetter = async (letterId: string) => {
        const res = await getPrevLetter(letterId);
        if (res?.status === 200) {
          const data: PrevLetter[] = res.data.data;
          setPrevLetter(data);
        } else {
          alert('이전 편지 데이터를 받아오는 도중 오류가 발생했습니다(잘못된 편지 접근입니다.)');
          navigate(-1);
        }
      };
      handleGetPrevLetter(letterId);
    }
  }, [location.state, prevLetter.length, navigate, letterId]);

  useEffect(() => {
    if (prevLetter.length > 0) {
      setIsReply(true);
    }
  }, [prevLetter.length]);

  useEffect(() => {
    return () => {
      resetLetterRequest();
    };
  }, [resetLetterRequest]);
  return (
    <div className={wrapStyle}>
      {step === 'edit' && (
        <LetterEditor
          setStep={setStep}
          prevLetter={prevLetter}
          setSend={setSend}
          searchParams={searchParams}
          isReply={isReply}
        />
      )}
      {step === 'category' && (
        <CategorySelect setStep={setStep} send={send} setSend={setSend} isReply={isReply} />
      )}
    </div>
  );
};

export default WritePage;
