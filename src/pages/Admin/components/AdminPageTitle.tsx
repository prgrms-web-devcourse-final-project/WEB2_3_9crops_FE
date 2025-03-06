import React from 'react';

export default function AdminPageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="body-l-m text-gray-80 border-gray-10 flex h-14 w-full shrink-0 items-center border-b px-5">
      {children}
    </h2>
  );
}
