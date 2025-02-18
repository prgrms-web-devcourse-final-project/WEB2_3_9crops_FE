import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import useWrite from '@/stores/writeStore';

import WritePageButton from './components/WritePageButton';
import OptionSlide from './OptionSlide';
import { T_prev_letter, T_step } from './write';

export default function LetterEditor({
  setStep,
  prevLetter,
}: {
  setStep: React.Dispatch<React.SetStateAction<T_step>>;
  prevLetter: T_prev_letter;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const font = useWrite((state) => state.font);

  const letterTitle = useWrite((state) => state.letterTitle);
  const setLetterTitle = useWrite((state) => state.setLetterTitle);

  const letterText = useWrite((state) => state.letterText);
  const setLetterText = useWrite((state) => state.setLetterText);

  const editorStyle = twMerge(
    `body-r basic-theme h-auto w-full px-6 focus:outline-none`,
    `${font}`,
  );

  const handleResizeHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto'; //height 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="mb-12">
      <OptionSlide prevLetter={prevLetter} />
      <div className="absolute right-5">
        {prevLetter ? (
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
        <div className="body-b mt-15 flex">
          <span>TO. </span>
          <span>{'12EE1'}</span>
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="body-sb placeholder:text-gray-40 placeholder:border-0 focus:outline-none"
          onChange={() => {
            setLetterTitle(titleRef.current!.value!);
          }}
          ref={titleRef}
          value={letterTitle}
        />
      </div>
      <div className="mt-9">
        <textarea
          rows={18}
          className={editorStyle}
          placeholder="클릭해서 내용을 작성하세요"
          onChange={() => {
            handleResizeHeight();
            setLetterText(textareaRef.current!.value!);
          }}
          ref={textareaRef}
          value={letterText}
        ></textarea>
      </div>
    </div>
  );
}
