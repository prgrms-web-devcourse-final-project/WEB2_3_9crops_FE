import { twMerge } from 'tailwind-merge';

function WritePageButton({
  text,
  bgColor = 'primary-2',
  target = '편지지',
  slideActive = false,
  rounded = 'sm',
  onClick,
}: {
  text: string;
  bgColor?: string;
  target?: Option;
  slideActive?: boolean;
  rounded?: string;
  onClick?: () => void;
}) {
  const buttonStyle = twMerge(
    'caption-sb rounded-sm px-2 py-1',
    `bg-${bgColor} rounded-${rounded}`,
    `${target === text && slideActive && 'bg-primary-2 text-gray-70'}`,
  );
  return (
    <button
      className={buttonStyle}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {text}
    </button>
  );
}

export default WritePageButton;
