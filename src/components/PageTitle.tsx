import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  className?: string;
  children: React.ReactNode;
}

const PageTitle = ({ className, children }: PageTitleProps) => {
  return (
    <h1 className={twMerge('text-gray-60 body-b w-fit rounded-full bg-white px-6 py-4 dark:shadow-[0_0px_10px_rgba(255,255,255,0.8)]', className)}>
      {children}
    </h1>
  );
};

export default PageTitle;
