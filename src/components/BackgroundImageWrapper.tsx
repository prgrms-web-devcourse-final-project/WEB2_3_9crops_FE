import { twMerge } from 'tailwind-merge';

interface BackgroundImageWrapperProps {
  as?: React.ElementType;
  imageUrl: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BackgroundImageWrapper = ({
  as: Component = 'div',
  imageUrl,
  className,
  children,
  onClick,
}: BackgroundImageWrapperProps) => {
  return (
    <Component
      className={twMerge('background-image-filled', className)}
      style={{ '--bg-image': `url(${imageUrl})` } as React.CSSProperties}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export default BackgroundImageWrapper;
