import useToastStore from '@/stores/toastStore';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ToastObj {
  time: number;
  toastType: 'Warning' | 'Success' | 'Error' | 'Info';
  position: 'Top' | 'Bottom';
  title: string;
  onClick?: () => void;
}
export default function ToastItem({ toastObj, index }: { toastObj: ToastObj; index: number }) {
  const setToastUnActive = useToastStore((state) => state.setToastUnActive);

  const TOAST_DESIGN = {
    Warning: { style: 'bg-primary-4', imoji: '⚠️' },
    Success: { style: 'bg-[#DFFFDA] text-[#000000]', imoji: '✅' },
    Error: { style: 'bg-[#FFDCD8] text-[#FF0000]', imoji: '🚨' },
    Info: { style: 'bg-[#FFFFFF]', imoji: '📫' },
  };

  const TOAST_POSITION = {
    Top: 'top-20',
    Bottom: 'bottom-5',
  };

  const animation = `toast-blink ${toastObj.time}s ease-in-out forwards`;
  const toastStyle = twMerge(
    'fixed bottom-5 left-1/2 z-50 flex h-[40px] max-w-150 min-w-[300px] w-[80%] -translate-1/2 items-center justify-center rounded-lg caption-sb shadow-[0_1px_6px_rgba(200,200,200,0.2)]',
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
