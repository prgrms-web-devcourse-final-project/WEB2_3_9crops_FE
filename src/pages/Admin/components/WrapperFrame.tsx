import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function WrapperFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={twMerge(
        'wrapper-box-shadow flex w-full flex-col rounded-lg bg-white p-6',
        className,
      )}
    >
      {children}
    </section>
  );
}
