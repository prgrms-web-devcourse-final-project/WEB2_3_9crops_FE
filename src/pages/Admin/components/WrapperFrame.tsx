import { ReactNode } from 'react';

export default function WrapperFrame({ children }: { children: ReactNode }) {
  return (
    <section className="wrapper-box-shadow flex w-full flex-col rounded-lg bg-white p-6">
      {children}
    </section>
  );
}
