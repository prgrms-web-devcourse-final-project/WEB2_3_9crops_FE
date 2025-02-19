import { twMerge } from 'tailwind-merge';

function WritePageButton({
  text,
  onClick,
  bgColor = 'primary-3',
  clicked = '편지지',
  rounded = 'sm',
}: {
  text: string;
  onClick?: () => void;
  bgColor?: string;
  clicked?: Option;
  rounded?: string;
}) {
  const buttonStyle = twMerge(
    'caption-sb text-gray-60 cursor-pointer rounded-sm px-2 py-1',
    `bg-${bgColor} rounded-${rounded}`,
    `${clicked === text && 'bg-primary-1 text-white'}`,
  );
  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}

export default WritePageButton;
