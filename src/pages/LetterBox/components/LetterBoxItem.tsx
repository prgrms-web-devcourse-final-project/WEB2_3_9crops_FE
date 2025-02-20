import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface LetterBoxItemProps {
  zipCode: string;
  letterCount: number;
  isChecked?: boolean;
  isClosed?: boolean;
}

const LetterBoxItem = ({
  zipCode,
  letterCount,
  isChecked = false,
  isClosed = false,
}: LetterBoxItemProps) => {
  return (
    <Link to="id">
      <article className="flex h-fit w-fit flex-col items-center">
        <div className="text-gray-70 flex h-25 w-20 flex-col gap-1.5 bg-linear-to-b from-[#D5B695] to-[#B3895D] p-1.5">
          <p
            className={twMerge(
              'body-m from-white px-1',
              isClosed
                ? 'bg-[repeating-linear-gradient(#D9D9D9,#D9D9D9_17px,#C2C2C2_17px,#C2C2C2_23px)]'
                : 'bg-linear-to-b',
              isChecked ? 'to-[#FFF5ED]' : 'to-[#FFF4F2]',
            )}
          >
            {zipCode}
          </p>
          {isClosed ? (
            <div className="flex grow flex-col bg-[repeating-linear-gradient(#D9D9D9,#D9D9D9_15px,#C2C2C2_15px,#C2C2C2_20px)]" />
          ) : (
            <div
              className={twMerge(
                'flex grow flex-col bg-linear-to-b',
                isChecked ? 'from-[#FFF7E3] to-[#FFE197]' : 'from-[#FFF4F2] to-[#FFE6E3]',
              )}
            >
              <p className="body-r mt-auto mr-[1px] text-right">{letterCount}통</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[7px] w-23 bg-[#D7A877]" />
          <div className="h-[3px] w-20 bg-[#A88156]" />
          <div className="h-1 w-18 bg-[#917B63]" />
        </div>
      </article>
    </Link>
  );
};

export default LetterBoxItem;
