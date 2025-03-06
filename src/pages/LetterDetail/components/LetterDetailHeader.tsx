import { useEffect, useRef, useState } from 'react';

import {
  CloudIcon,
  DeleteIcon,
  SirenOutlinedIcon,
  SnowIcon,
  ThermostatIcon,
  WarmIcon,
} from '@/assets/icons';
import BackButton from '@/components/BackButton';
import useAuthStore from '@/stores/authStore';

interface LetterDetailHeader {
  letterDetail: LetterDetail | null;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReportModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LetterDetailHeader({
  letterDetail,
  setDeleteModalOpen,
  setReportModalOpen,
}: LetterDetailHeader) {
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);

  const DEGREES = [
    { icon: <WarmIcon className="h-5 w-5" />, title: '따뜻해요' },
    { icon: <CloudIcon className="h-5 w-5" />, title: '그럭저럭' },
    { icon: <SnowIcon className="h-5 w-5" />, title: '앗! 차가워' },
  ];
  const userZipCode = useAuthStore((state) => state.zipCode);

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
    <div className="absolute top-5 left-0 flex w-full justify-between px-5">
      <BackButton />
      <div className="flex gap-2">
        {userZipCode !== letterDetail?.zipCode && (
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
        {userZipCode === letterDetail?.zipCode && (
          <button
            onClick={() => {
              setDeleteModalOpen(true);
            }}
          >
            <DeleteIcon className="text-primary-1 h-6 w-6" />
          </button>
        )}
        {userZipCode !== letterDetail?.zipCode && (
          <button
            onClick={() => {
              setReportModalOpen(true);
            }}
          >
            <SirenOutlinedIcon className="text-primary-1 h-6 w-6" />
          </button>
        )}
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
                  {degree.icon}
                  {degree.title}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
