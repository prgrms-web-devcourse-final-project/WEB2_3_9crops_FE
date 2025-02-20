import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CloudIcon, ColorSirenIcon, SnowIcon, ThermostatIcon, WarmIcon } from '@/assets/icons';

import ReportModal from './ReportModal';

export default function LetterDetail({ title, text }: { title: string; text: string }) {
  const FONT = '';
  const THEME = 'celebrate';
  const DEGREES = [
    { icon: WarmIcon, title: '따뜻해요' },
    { icon: CloudIcon, title: '그럭저럭' },
    { icon: SnowIcon, title: '앗! 차가워' },
  ];
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  const degreeButtonRef = useRef<HTMLButtonElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target || degreeButtonRef.current?.contains(target)) {
      return;
    }
    setDegreeModalOpen(false);
  };
  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <>
      {reportModalOpen && <ReportModal onClose={() => setReportModalOpen(false)} />}
      <div className={twMerge(`flex grow flex-col gap-3 px-5 pb-7.5`, THEME)}>
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            ref={degreeButtonRef}
            className="flex items-center justify-center gap-1"
            onClick={() => {
              setDegreeModalOpen((cur) => !cur);
            }}
          >
            <img src={ThermostatIcon} alt="편지 온도 아이콘" />
            <span className="caption-b text-primary-1">편지 온도</span>
          </button>
          <button
            onClick={() => {
              setReportModalOpen(true);
            }}
          >
            <img src={ColorSirenIcon} alt="신고 아이콘" />
          </button>
          {degreeModalOpen && (
            <div className="caption-b text-primary-1 bg-primary-5 absolute top-7 z-40 flex flex-col gap-1 p-2 shadow">
              {DEGREES.map((degree, idx) => {
                return (
                  <button
                    key={idx}
                    className="flex items-center justify-start gap-1"
                    onClick={() => {
                      console.log(idx);
                    }}
                  >
                    <img src={degree.icon} alt={`${degree.title} 아이콘`} /> {degree.title}
                  </button>
                );
              })}
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
        <button className="bg-primary-3 body-m mt-3 w-full rounded-lg py-2">편지 작성하기</button>
      </div>
    </>
  );
}
