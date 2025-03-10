import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

const LetterBoxItem = ({
  boxId,
  zipCode,
  letterCount,
  isChecked = false,
  isClosed = false,
  oppositeId,
}: LetterBoxItemProps) => {
  const navigate = useNavigate();
  const handleClickItem = (id: number) => {
    navigate(`${id}`, {
      state: {
        id,
        zipCode,
        isClosed,
        oppositeId,
      },
    });
  };
  return (
    <article
      className="flex h-fit w-fit flex-col items-center"
      onClick={() => handleClickItem(boxId)}
    >
      <div className="text-gray-70 window-bg flex h-25 w-20 flex-col gap-1.5 bg-linear-to-b p-1.5">
        <p
          className={twMerge(
            'body-m from-white px-1',
            isClosed
              ? 'bg-[repeating-linear-gradient(#D9D9D9,#D9D9D9_17px,#C2C2C2_17px,#C2C2C2_23px)]'
              : isChecked
                ? 'window-top-checked'
                : 'window-top-unChecked',
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
              isChecked ? 'window-bottom-checked' : 'window-bottom-unChecked',
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
  );
};

export default LetterBoxItem;
