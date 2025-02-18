import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import CategorySelect from './CategorySelect';
import { themeObj } from './constants';
import LetterEditor from './LetterEditor';
import { T_prev_letter, T_step } from './write';

const WritePage = () => {
  const [step, setStep] = useState<T_step>('edit');
  // 대화가 답장일 경우 이전 편지가 여기 담김(배열로 받아질 것으로 예상)
  const [prevLetter, setPrevLetter] = useState<T_prev_letter>([
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
    `${step === 'edit' && themeObj[theme]}`,
  );
  return (
    <div className={wrapStyle}>
      {step === 'edit' && <LetterEditor setStep={setStep} prevLetter={prevLetter} />}
      {step === 'category' && <CategorySelect setStep={setStep} prevLetter={prevLetter} />}
    </div>
  );
};

export default WritePage;
