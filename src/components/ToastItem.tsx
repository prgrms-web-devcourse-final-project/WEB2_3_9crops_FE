import useToastStore from '@/stores/toastStore';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ToastObj {
  time: number;
  toastType: 'Warning' | 'Success' | 'Error' | 'Info';
  position: 'TOP' | 'BOTTOM';
  title: string;
  onClick?: () => void;
}
export default function ToastItem({ toastObj, index }: { toastObj: ToastObj; index: number }) {
  const setToastUnActive = useToastStore((state) => state.setToastUnActive);

  const TOAST_DESIGN = {
    Warning: { style: 'bg-primary-4', imoji: '⚠️' },
    Success: { style: 'bg-[#38d9a9] text-[#FFFFFF]', imoji: '✅' },
    Error: { style: 'bg-[#FFDCD8] text-[#FF0000]', imoji: '🚨' },
    Info: { style: 'bg-[#FFFFFF]', imoji: '📫' },
  };

  const TOAST_POSITION = {
    TOP: 'top-20',
    BOTTOM: 'bottom-20',
  };

  const animation = `toast-blink ${toastObj.time}s ease-in-out forwards`;
  const toastStyle = twMerge(
    'fixed bottom-20 left-1/2 z-40 flex h-[40px] max-w-150 min-w-[335px] w-[85%] -translate-1/2 items-center justify-center rounded-2xl caption-sb',
    TOAST_POSITION[toastObj.position],
    TOAST_DESIGN[toastObj.toastType].style,
  );

  const activeTime = toastObj.time * 1000;
  useEffect(() => {
    const closeToast = setTimeout(() => {
      setToastUnActive(index);
    }, activeTime);

    return () => clearTimeout(closeToast);
  });
  return (
    <div
      className={toastStyle}
      style={{ animation: animation }}
      onClick={() => {
        setToastUnActive(index);
        if (toastObj.onClick) toastObj.onClick();
      }}
    >
      {`${TOAST_DESIGN[toastObj.toastType].imoji} ${toastObj.title} ${TOAST_DESIGN[toastObj.toastType].imoji}`}
    </div>
  );
}
