import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getPrevLetter } from '@/apis/write';
import useWrite from '@/stores/writeStore';

import CategorySelect from './CategorySelect';
import { PAPER_TYPE_OBJ } from './constants';
import LetterEditor from './LetterEditor';

const WritePage = () => {
  const [searchParams] = useSearchParams();

  const [send, setSend] = useState<boolean>(false);
  const [step, setStep] = useState<Step>('edit');
  // prevLetter를 받았을때, 데이터 중에 receiverId가 전역변수의 memberId와 일치하는지 판단해 일치하지 않으면 메인페이지로 리다이렉션 하는 로직 만들어야함(그런데 아직 prevLetter데이터에 receiverId값이 없음 진영님께 부탁해야함!)
  const [prevLetter, setPrevLetter] = useState<PrevLetter[]>([]);

  const letterRequest = useWrite((state) => state.letterRequest);
  const resetLetterRequest = useWrite((state) => state.resetLetterRequest);

  useEffect(() => {
    const letterId = searchParams.get('letterId');
    if (letterId) {
      getPrevLetter(letterId, setPrevLetter);
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      resetLetterRequest();
    };
  }, [resetLetterRequest]);

  useEffect(() => {
    const navigationGuard = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', navigationGuard);

    return () => {
      window.removeEventListener('beforeunload', navigationGuard);
    };
  }, []);

  const wrapStyle = twMerge(
    'relative p-5 w-full grow flex flex-col',
    `${step === 'edit' && PAPER_TYPE_OBJ[letterRequest.paperType]}`,
  );
  return (
    <div className={wrapStyle}>
      {step === 'edit' && (
        <LetterEditor
          setStep={setStep}
          prevLetter={prevLetter}
          setSend={setSend}
          searchParams={searchParams}
        />
      )}
      {step === 'category' && (
        <CategorySelect setStep={setStep} prevLetter={prevLetter} send={send} setSend={setSend} />
      )}
    </div>
  );
};

export default WritePage;
