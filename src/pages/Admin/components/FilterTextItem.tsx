import { patchBadWordsUsed } from '@/apis/admin';
import { DeleteIcon, PencilIcon, ToggleOff, ToggleOn } from '@/assets/icons';
import { useState } from 'react';
import PatchInput from './PatchInput';

export default function FilterTextItem({
  badWord,
  setBadWords,
}: {
  badWord: BadWordsData;
  setBadWords: React.Dispatch<React.SetStateAction<BadWordsData[]>>;
}) {
  const [patchInputShow, setPatchInputShow] = useState<boolean>(false);

  return (
    <span className="bg-primary-3 flex items-center gap-1.5 rounded-2xl px-4 py-1.5">
      {patchInputShow ? (
        <PatchInput
          badWordId={badWord.id}
          setPatchInputShow={setPatchInputShow}
          setBadWords={setBadWords}
        />
      ) : (
        badWord.word
      )}

      <button onClick={() => setPatchInputShow(true)}>
        <PencilIcon className="h-4 w-4" />
      </button>

      <button onClick={() => {}}>
        <DeleteIcon className="h-5 w-5" />
      </button>

      <button onClick={() => patchBadWordsUsed(badWord.id)}>
        {true ? <ToggleOn className="h-5 w-5" /> : <ToggleOff className="h-5 w-5" />}
      </button>
    </span>
  );
}
