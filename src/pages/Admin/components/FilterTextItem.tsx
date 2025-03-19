import { deleteBadWords, patchBadWordsUsed } from '@/apis/admin';
import { DeleteIcon, PencilIcon, ToggleOff, ToggleOn } from '@/assets/icons';
import { useState } from 'react';
import PatchInput from './PatchInput';
import { twMerge } from 'tailwind-merge';

export default function FilterTextItem({
  badWord,
  setBadWords,
}: {
  badWord: BadWordsData;
  setBadWords: React.Dispatch<React.SetStateAction<BadWordsData[]>>;
}) {
  const [patchInputShow, setPatchInputShow] = useState<boolean>(false);

  const handleDeleteBadWords = async (id: string) => {
    const res = await deleteBadWords(id);
    if (res?.status === 200) {
      setBadWords((cur) =>
        cur.filter((e) => {
          if (e.id === id) {
            return null;
          }
          return e;
        }),
      );
    }
  };

  const handlePatchBadWordsUsed = async (id: string, isUsed: string) => {
    const res = await patchBadWordsUsed(id, isUsed);
    if (res?.status === 200) {
      setBadWords((cur) =>
        cur.map((e) => {
          if (e.id === id) {
            let reverseIsUsed: string;
            if (e.isUsed === 'true') {
              reverseIsUsed = 'false';
            } else {
              reverseIsUsed = 'true';
            }
            return { ...e, isUsed: reverseIsUsed };
          }
          return e;
        }),
      );
    }
  };

  const buttonStyle = twMerge(
    `flex items-center gap-1.5 rounded-2xl px-4 py-1.5`,
    badWord.isUsed === 'true' ? 'bg-primary-3' : 'bg-[#c1c1c1]',
  );

  return (
    <span className={buttonStyle}>
      {patchInputShow ? (
        <PatchInput
          badWordId={badWord.id}
          setPatchInputShow={setPatchInputShow}
          setBadWords={setBadWords}
        />
      ) : (
        badWord.word
      )}

      <button onClick={() => setPatchInputShow(true)} aria-label="작성하기">
        <PencilIcon className="h-4 w-4" />
      </button>

      <button
        onClick={() => {
          handleDeleteBadWords(badWord.id);
        }}
        aria-label="삭제하기"
      >
        <DeleteIcon className="h-5 w-5" />
      </button>

      <button
        onClick={() => handlePatchBadWordsUsed(badWord.id, badWord.isUsed)}
        aria-label={badWord.isUsed === 'true' ? '비속어 사용 활성화' : '비속어 사용 비활성화'}
      >
        {badWord.isUsed === 'true' ? (
          <ToggleOn className="h-5 w-5" />
        ) : (
          <ToggleOff className="h-5 w-5" />
        )}
      </button>
    </span>
  );
}
