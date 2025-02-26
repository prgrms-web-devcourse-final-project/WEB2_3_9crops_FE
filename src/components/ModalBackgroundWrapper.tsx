import { twMerge } from 'tailwind-merge';

interface ModalBackgroundWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const ModalBackgroundWrapper = ({ className, children }: ModalBackgroundWrapperProps) => {
  return (
    <article className={twMerge('bg-primary-3 relative overflow-hidden', className)}>
      <div className="relative z-1">{children}</div>
      <div className="absolute inset-0 z-0 bg-white/70 blur-xl" />
    </article>
  );
};

export default ModalBackgroundWrapper;
