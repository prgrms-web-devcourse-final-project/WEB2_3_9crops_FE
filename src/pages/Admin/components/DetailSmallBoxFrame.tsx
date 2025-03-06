import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DetailSmallBoxFrame {
  children: ReactNode;
  className?: string;
}
export default function DetailSmallBoxFrame({ children, className }: DetailSmallBoxFrame) {
  const frameStyle = twMerge(`w-full rounded-lg border border-[#D6D6D6] px-3 py-4`, className);
  return <div className={frameStyle}>{children}</div>;
}
