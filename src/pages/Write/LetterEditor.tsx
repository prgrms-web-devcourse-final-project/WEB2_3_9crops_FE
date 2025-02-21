import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import WritePageButton from './components/WritePageButton';
import { FONTS } from './constants';
import OptionSlide from './OptionSlide';

export default function LetterEditor({
  setStep,
  prevLetter,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  prevLetter: PrevLetter[];
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const fontType = useWrite((state) => state.fontType);

  const letterTitle = useWrite((state) => state.letterTitle);
  const setLetterTitle = useWrite((state) => state.setLetterTitle);

  const letterText = useWrite((state) => state.letterText);
  const setLetterText = useWrite((state) => state.setLetterText);

  const handleResizeHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto'; //height 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex grow flex-col pb-15">
      <OptionSlide prevLetter={prevLetter} />
      <div className="absolute right-5">
        {prevLetter.length > 0 ? (
          <WritePageButton
            text="답장 전송"
            onClick={() => {
              if (letterTitle.trim() !== '' && letterText.trim() !== '') {
                setStep('category');
              } else {
                alert('편지 제목, 내용이 작성되었는지 확인해주세요');
              }
            }}
          />
        ) : (
          <WritePageButton
            text="다음 단계"
            onClick={() => {
              if (letterTitle.trim() !== '' && letterText.trim() !== '') {
                setStep('category');
              } else {
                alert('편지 제목, 내용이 작성되었는지 확인해주세요');
              }
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 px-6">
        <div className="body-b mt-15">TO. {'12EE1'}</div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="body-sb placeholder:text-gray-40 placeholder:border-0"
          onChange={(e) => {
            setLetterTitle(e.target.value);
          }}
          value={letterTitle}
        />
      </div>
      <div className="mt-9 flex grow">
        <textarea
          className={twMerge(`body-r basic-theme min-h-full w-full px-6`, `${FONTS[fontType]}`)}
          placeholder="클릭해서 내용을 작성하세요"
          onChange={(e) => {
            handleResizeHeight();
            setLetterText(e.target.value);
          }}
          value={letterText}
        ></textarea>
      </div>
    </div>
  );
}
