import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  className?: string;
  children: React.ReactNode;
}

const PageTitle = ({ className, children }: PageTitleProps) => {
  return (
    <h1 className={twMerge('text-gray-60 body-b rounded-full bg-white px-6 py-4', className)}>
      {children}
    </h1>
  );
};

export default PageTitle;
