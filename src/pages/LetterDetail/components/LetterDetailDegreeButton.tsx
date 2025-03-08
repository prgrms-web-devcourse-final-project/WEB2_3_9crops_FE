import { useEffect, useRef } from 'react';

import { ThermostatIcon } from '@/assets/icons';

interface LetterDetailDegreeButton {
  letterDetail: LetterDetail | null;
  setDegreeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LetterDetailDegreeButton({
  letterDetail,
  setDegreeModalOpen,
}: LetterDetailDegreeButton) {
  const degreeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!target || degreeButtonRef.current?.contains(target)) {
        return;
      }
      setDegreeModalOpen(false);
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [setDegreeModalOpen]);
  return (
    <>
      {letterDetail?.evaluated ? (
        <div>
          <span className="caption-b text-primary-1">온도 측정된 편지에요!</span>
        </div>
      ) : (
        <button
          ref={degreeButtonRef}
          className="flex items-center justify-center gap-1"
          onClick={() => {
            setDegreeModalOpen((cur) => !cur);
          }}
        >
          <ThermostatIcon className="h-6 w-6" />
          <span className="caption-b text-primary-1">편지 온도</span>
        </button>
      )}
    </>
  );
}
