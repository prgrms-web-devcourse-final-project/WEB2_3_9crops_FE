import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import CategorySelect from './CategorySelect';
import { THEME_OBJ } from './constants';
import LetterEditor from './LetterEditor';

const WritePage = () => {
  const [step, setStep] = useState<Step>('edit');
  // 대화가 답장일 경우 이전 편지가 여기 담김(배열로 받아질 것으로 예상)
  const [prevLetter, setPrevLetter] = useState<PrevLetter>([
    {
      title: '안녕하세요 고민이 있어요',
      text: '이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민이런저런요론 고민',
    },
    {
      title: '안녕하세요 다른 고민이 하나 있어요',
      text: '요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민요롷고그런그런 고민',
    },
  ]);
  // useEffect(() => {
  //   setPrevLetter(null);
  // });

  const theme = useWrite((state) => state.theme);

  const wrapStyle = twMerge(
    'relative h-full min-h-screen w-full p-5',
    `${step === 'edit' && THEME_OBJ[theme]}`,
  );
  return (
    <div className={wrapStyle}>
      {step === 'edit' && <LetterEditor setStep={setStep} prevLetter={prevLetter} />}
      {step === 'category' && <CategorySelect setStep={setStep} prevLetter={prevLetter} />}
    </div>
  );
};

export default WritePage;
