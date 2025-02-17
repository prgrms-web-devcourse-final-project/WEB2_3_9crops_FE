import { twMerge } from 'tailwind-merge';
import CheckIcon from './components/CheckIcon';

export default function FontOption({
  fontFamilyName = 'courier',
  fontFamily = 'courier',
}: {
  fontFamilyName?: string;
  fontFamily?: string;
}) {
  const dummy = new Array(10).fill(null);

  const fontStyle = twMerge(
    'w-full caption-m px-3 py-2 bg-white rounded-lg flex flex-start items-center justify-between cursor-pointer',
    `${fontFamily}`,
  );
  return (
    <>
      <div className="h-[330px] overflow-y-scroll">
        {dummy.map((_, idx) => {
          return (
            <div className="w-full" key={idx}>
              <div className="flex flex-col items-start gap-1.5">
                <p className="caption-m">{fontFamilyName}</p>
                <button className={fontStyle}>
                  안녕! 나는 따수미야! 내 우편번호는 012345야. <CheckIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
