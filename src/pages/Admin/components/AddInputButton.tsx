import { useEffect, useRef, useState } from 'react';

import { postBadWords } from '@/apis/admin';
import { AddIcon } from '@/assets/icons';

export default function AddInputButton({
  setAddInputShow,
  setBadWords,
}: {
  setAddInputShow: React.Dispatch<React.SetStateAction<boolean>>;
  setBadWords: React.Dispatch<React.SetStateAction<BadWordsData[]>>;
}) {
  const [inputText, setInputText] = useState<BadWords>({ word: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputWidth = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    target.style.width = '50px';
    target.style.width = `${target.scrollWidth}px`;
  };

  const handlePostBadWords = async () => {
    if (inputText.word === '') return setAddInputShow(false);
    const res = await postBadWords(inputText);
    if (res?.status === 200) {
      setBadWords((cur) => [...cur, { ...res.data.data, isUsed: `${res.data.data.isUsed}` }]);
      setAddInputShow(false);
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <span className="flex items-center gap-1.5 rounded-2xl bg-[#C1C1C1] px-4 py-1.5">
      <input
        ref={inputRef}
        type="text"
        className="w-10 min-w-10"
        onInput={(e) => {
          handleInputWidth(e);
        }}
        onChange={(e) => {
          setInputText(() => ({ word: e.target.value }));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handlePostBadWords();
          }
        }}
      />
      <button
        onClick={() => {
          handlePostBadWords();
        }}
      >
        <AddIcon className="h-4 w-4" />
      </button>
    </span>
  );
}
