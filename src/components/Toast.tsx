import useToastStore from '@/stores/toastStore';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface Toast {}
export default function Toast({}: Toast) {
  const isActive = useToastStore((state) => state.isActive);
  const toastObj = useToastStore((state) => state.toastObj);
  const setToastUnActive = useToastStore((state) => state.setToastUnActive);

  const TOAST_DESIGN = {
    Warning: { style: 'bg-primary-3' },
    Success: { style: 'bg-[#38d9a9] text-[#FFFFFF]' },
    Error: { style: 'bg-[#FFDCD8] text-[#FF0000]' },
    Info: { style: 'bg-[#FFFFFF]' },
  };

  const toastStyle = twMerge(
    'fixed top-10 left-1/2 z-40 flex h-[50px] min-w-[335px] w-[85%] -translate-1/2 items-center justify-center rounded-2xl caption-sb',
    TOAST_DESIGN[toastObj.toastType].style,
  );

  const activeTime = toastObj.time * 1000;
  useEffect(() => {
    setTimeout(() => {
      setToastUnActive();
    }, activeTime);
  });
  if (!isActive) return null;
  return <div className={toastStyle}>{toastObj.children}</div>;
}
