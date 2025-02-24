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
  const [prevLetter, setPrevLetter] = useState<PrevLetter[]>([]);

  const paperType = useWrite((state) => state.paperType);
  const resetWrite = useWrite((state) => state.resetWrite);

  useEffect(() => {
    const letterId = searchParams.get('letterId');
    if (letterId) {
      getPrevLetter(letterId, setPrevLetter);
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      resetWrite();
    };
  }, [resetWrite]);

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
    `${step === 'edit' && PAPER_TYPE_OBJ[paperType]}`,
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
