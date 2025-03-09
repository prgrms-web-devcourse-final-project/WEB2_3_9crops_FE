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

  const animation = `toast-blink ${toastObj.time}s ease-in-out forwards`;
  const toastStyle = twMerge(
    'fixed bottom-20 left-1/2 z-40 flex h-[40px] min-w-[335px] w-[85%] -translate-1/2 items-center justify-center rounded-2xl caption-sb',
    TOAST_DESIGN[toastObj.toastType].style,
  );

  const activeTime = toastObj.time * 1000;
  useEffect(() => {
    const closeToast = setTimeout(() => {
      setToastUnActive();
    }, activeTime);

    return () => clearTimeout(closeToast);
  });

  if (!isActive) return null;
  return (
    <div className={toastStyle} style={{ animation: animation }} onClick={() => setToastUnActive()}>
      {toastObj.content}
    </div>
  );
}
