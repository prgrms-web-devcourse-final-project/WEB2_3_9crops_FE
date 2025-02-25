import { useEffect, useState } from 'react';

import { getBadWords } from '@/apis/admin';
import { AddIcon, AlarmIcon, CancelIcon } from '@/assets/icons';

import AddInputButton from './components/AddInputButton';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';

export default function Filtering() {
  const [badWords, setBadWords] = useState<BadWords[]>([]);
  const [addInputShow, setAddInputShow] = useState<boolean>(false);

  useEffect(() => {
    getBadWords(setBadWords);
  }, []);
  return (
    <WrapperFrame>
      <WrapperTitle title="필터링 단어 설정" Icon={AlarmIcon} />
      <div className="mt-5 flex w-full flex-wrap gap-4">
        {badWords.map((badWord, idx) => {
          return (
            <span
              key={idx}
              className="flex items-center gap-1.5 rounded-2xl bg-[#C1C1C1] px-4 py-1.5"
            >
              {badWord.word}
              <button>
                <CancelIcon className="h-4 w-4" />
              </button>
            </span>
          );
        })}
        {addInputShow ? (
          <AddInputButton setAddInputShow={setAddInputShow} setBadWords={setBadWords} />
        ) : (
          <span className="flex items-center gap-1.5 rounded-2xl bg-[#C1C1C1] px-4 py-1.5">
            추가하기
            <button
              onClick={() => {
                setAddInputShow(true);
              }}
            >
              <AddIcon className="h-4 w-4" />
            </button>
          </span>
        )}
      </div>
    </WrapperFrame>
  );
}
