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

  const [step, setStep] = useState<Step>('edit');
  const [prevLetter, setPrevLetter] = useState<PrevLetter[]>([]);

  const paperType = useWrite((state) => state.paperType);
  const resetWrite = useWrite((state) => state.resetWrite);

  // 답글 작성 과정에서 데이터 정제 + 답글작성시 api연결 해야함(백서버가 꺼져서 내일 진행2025.02.21)

  // const LETTER_REQUEST: LetterRequest = {
  //   receiver: null,
  //   parentLetterId: null,
  //   title: letterTitle,
  //   content: letterText,
  //   category: searchParams,
  //   paperType: paperType,
  //   fontType: fontType,
  // };

  useEffect(() => {
    if (searchParams.get('letterId')) {
      getPrevLetter(setPrevLetter, searchParams);
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
      {step === 'edit' && <LetterEditor setStep={setStep} prevLetter={prevLetter} />}
      {step === 'category' && <CategorySelect setStep={setStep} prevLetter={prevLetter} />}
    </div>
  );
};

export default WritePage;
