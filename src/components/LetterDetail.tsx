import { CloudIcon, ColorSirenIcon, SnowIcon, ThermostatIcon, WarmIcon } from '@/assets/icons';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function LetterDetail({ title, text }: { title: string; text: string }) {
  const FONT = '';
  const THEME = 'field';
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);
  return (
    <div className={twMerge(`flex grow flex-col gap-3 px-5 pb-7.5`, THEME)}>
      <div className="absolute top-5 right-5 flex gap-3">
        <button
          className="flex items-center justify-center gap-1"
          onClick={() => {
            setDegreeModalOpen(true);
          }}
        >
          <img src={ThermostatIcon} alt="편지 온도 아이콘" />
          <span className="caption-b text-primary-1">편지 온도</span>
        </button>
        <button onClick={() => {}}>
          <img src={ColorSirenIcon} alt="신고 아이콘" />
        </button>
        {degreeModalOpen && (
          <div className="caption-b text-primary-1 bg-primary-5 absolute top-7 z-40 flex flex-col gap-1 p-2 shadow">
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => {
                setDegreeModalOpen(false);
              }}
            >
              <img src={WarmIcon} alt="따뜻 아이콘" /> 따뜻해요
            </button>
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => {
                setDegreeModalOpen(false);
              }}
            >
              <img src={CloudIcon} alt="그럭저럭 아이콘" /> 그럭저럭
            </button>
            <button
              className="flex items-center justify-center gap-1"
              onClick={() => {
                setDegreeModalOpen(false);
              }}
            >
              <img src={SnowIcon} alt="차가움 아이콘" /> 앗! 차가워
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 px-5">
        <span className="body-b mt-[55px]">TO. 따숨이</span>
        <span className="body-sb">{title}</span>
      </div>
      <textarea
        readOnly
        value={text}
        className={twMerge(
          `body-r basic-theme min-h-full w-full grow px-6 focus:outline-none`,
          `${FONT}`,
        )}
      ></textarea>
      <span className="body-sb mt-10 flex justify-end">FROM. {'12E12'}</span>
      <button className="bg-primary-3 mt-3 w-full rounded-lg py-2">편지 작성하기</button>
    </div>
  );
}
