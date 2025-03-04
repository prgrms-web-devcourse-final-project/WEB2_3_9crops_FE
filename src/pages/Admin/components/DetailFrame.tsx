import { ReactNode, useEffect, useRef } from 'react';

import { getScrollbarWidth } from '@/utils/getScrollbarWidth';

export default function DetailFrame({
  children,
  closeEvent,
}: {
  children: ReactNode;
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (!contentRef.current?.contains(target)) closeEvent(false);
  };

  useEffect(() => {
    // 대황민하님 스크롤바 넓이 측정기
    const scrollbarWidth = getScrollbarWidth();

    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflowY = '';
      document.body.style.marginRight = `0px`;
    };
  }, []);
  return (
    <div
      className="absolute top-0 left-0 z-40 flex h-full max-h-screen w-full justify-end bg-black/70"
      onClick={(e) => handleOutsideClick(e)}
    >
      <div
        ref={contentRef}
        className="flex w-full max-w-105 grow flex-col overflow-y-scroll border-l border-[#D6D6D6] bg-white p-7"
      >
        {children}
      </div>
    </div>
  );
}
