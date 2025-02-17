import { useRef } from 'react';

import WritePageButton from './WritePageButton';
import WritePageOptionSlide from './WritePageOptionSlide';

const WritePage = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto'; //height 초기화
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="relative p-5">
      <WritePageOptionSlide />
      <div className="flex w-full justify-end gap-3">
        <WritePageButton
          text="연락 끊기"
          onClick={() => {
            console.log('연락 끊기');
          }}
        />
        <WritePageButton
          text="작성 완료"
          onClick={() => {
            console.log('작성 완료');
          }}
        />
      </div>
      <div className="flex flex-col gap-3 px-6">
        <div className="body-b mt-7 flex">
          <span>TO. </span>
          <span>{'12EE1'}</span>
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="body-sb placeholder:text-gray-40 placeholder:border-0 focus:outline-0"
        />
      </div>
      <div className="mt-9">
        <textarea
          rows={20}
          className="body-r basic-theme h-auto w-full px-6 focus:outline-none"
          placeholder="클릭해서 내용을 작성하세요"
          onChange={handleResizeHeight}
          ref={textareaRef}
        ></textarea>
      </div>
    </div>
  );
};

export default WritePage;
