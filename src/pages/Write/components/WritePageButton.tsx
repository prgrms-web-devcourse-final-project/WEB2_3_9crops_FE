import { twMerge } from 'tailwind-merge';

function WritePageButton({
  text,
  onClick,
  bgColor = 'primary-3',
  rounded = '[4px]',
}: {
  text: string;
  onClick?: () => void;
  bgColor?: string;
  rounded?: string;
}) {
  const buttonStyle = twMerge(
    'caption-sb text-gray-60 cursor-pointer px-2 py-1',
    `bg-${bgColor} rounded-${rounded}`,
  );
  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}

export default WritePageButton;
