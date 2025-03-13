import { useEffect, useRef, useState } from 'react';

import { patchBadWords } from '@/apis/admin';
import { AddIcon } from '@/assets/icons';

export default function PatchInput({
  badWordId,
  setPatchInputShow,
  setBadWords,
}: {
  badWordId: string;
  setPatchInputShow: React.Dispatch<React.SetStateAction<boolean>>;
  setBadWords: React.Dispatch<React.SetStateAction<BadWordsData[]>>;
}) {
  const [inputText, setInputText] = useState<BadWords>({ word: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputWidth = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    target.style.width = '50px';
    target.style.width = `${target.scrollWidth}px`;
  };

  const handlePatchBadWords = async () => {
    if (inputText.word === '') return setPatchInputShow(false);
    const res = await patchBadWords(badWordId, inputText.word);
    if (res?.status === 200) {
      setBadWords((cur) =>
        cur.map((e) => {
          if (e.id === badWordId) {
            return { ...e, word: inputText.word };
          }
          return e;
        }),
      );
      setPatchInputShow(false);
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <>
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
            handlePatchBadWords();
          }
        }}
      />
      <button
        onClick={() => {
          handlePatchBadWords();
        }}
        aria-label="추가하기"
      >
        <AddIcon className="h-4 w-4" />
      </button>
    </>
  );
}
