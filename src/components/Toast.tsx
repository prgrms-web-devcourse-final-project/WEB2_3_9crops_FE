import useToastStore from '@/stores/toastStore';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface Toast {}
export default function Toast({}: Toast) {
  const isActive = useToastStore((state) => state.isActive);
  const toastObj = useToastStore((state) => state.toastObj);
  const setToastUnActive = useToastStore((state) => state.setToastUnActive);

  const TOAST_DESIGN = {
    Warning: { style: 'bg-primary-4', imoji: '⚠️' },
    Success: { style: 'bg-[#38d9a9] text-[#FFFFFF]', imoji: '✅' },
    Error: { style: 'bg-[#FFDCD8] text-[#FF0000]', imoji: '🚨' },
    Info: { style: 'bg-[#FFFFFF]', imoji: 'ℹ️' },
  };

  const animation = `toast-blink ${toastObj.time}s ease-in-out forwards`;
  const toastStyle = twMerge(
    'fixed bottom-20 left-1/2 z-40 flex h-[40px] max-w-150 min-w-[335px] w-[85%] -translate-1/2 items-center justify-center rounded-2xl caption-sb',
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
      {`${TOAST_DESIGN[toastObj.toastType].imoji} ${toastObj.content} ${TOAST_DESIGN[toastObj.toastType].imoji}`}
    </div>
  );
}
