import { ReactNode } from 'react';

export default function ListHeaderFrame({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary-3 flex w-full border-b px-6 py-4">
      <div className="flex w-[80%] items-center">{children}</div>
    </div>
  );
}
