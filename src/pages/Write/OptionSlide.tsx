import { Component, useRef } from 'react';
import FontOption from './FontOption';
import PreviousLetterOption from './PreviousLetterOption';
import WritePageButton from './components/WritePageButton';

function OptionSlide() {
  const letterRef = useRef<Component>(null);
  return (
    <div className="bg-primary-3 absolute bottom-0 left-0 flex h-110 w-full flex-col rounded-t-[20px]">
      <div className="border-primary-1 flex items-center justify-between border-b-2 px-4 pt-6 pb-4">
        <div className="bg-primary-1 absolute top-3 left-[50%] h-[3px] w-7.5 translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="flex gap-2">
          <WritePageButton text="편지지" bgColor="white" rounded="lg" />
          <WritePageButton text="글꼴" bgColor="white" rounded="lg" />
        </div>
        <WritePageButton text="이전 편지 내용" bgColor="white" rounded="lg" />
      </div>
      <div className="flex w-full flex-col gap-3 px-4 pt-3 pb-[30px]">
        {/* <ThemeOption /> */}
        {/* <FontOption /> */}
        <PreviousLetterOption />
      </div>
    </div>
  );
}

export default OptionSlide;
