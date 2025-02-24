import { ReactNode, useRef } from 'react';

export default function DetailFrame({
  children,
  closeEvent,
}: {
  children: ReactNode;
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== contentRef.current) closeEvent(false);
  };
  return (
    <div
      className="absolute top-0 left-0 z-40 flex h-full w-full justify-end bg-black/70"
      onClick={(e) => handleOutsideClick(e)}
    >
      <div
        ref={contentRef}
        className="flex w-full max-w-105 grow flex-col border-l border-[#D6D6D6] bg-white p-7"
      >
        {children}
      </div>
    </div>
  );
}
