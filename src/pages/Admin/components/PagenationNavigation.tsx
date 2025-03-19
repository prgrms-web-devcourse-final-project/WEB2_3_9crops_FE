import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PagenationNavigation {
  totalPage: number;
  buttonLength: number;
  handlePageNumberButtonClick: (page: string) => void;
}
export default function PagenationNavigation({
  totalPage,
  buttonLength,
  handlePageNumberButtonClick,
}: PagenationNavigation) {
  const totalSection = Math.ceil(totalPage / buttonLength) - 1;
  const [nowSection, setNowSection] = useState<number>(0);
  const [nowPageNumberAt, setNowPageNumberAt] = useState(1);

  // 네비게이션 시작점, 끝점
  const navigationRange = {
    start: nowSection * buttonLength + 1,
    end: nowSection * buttonLength + buttonLength,
  };

  // 페이지 버튼 배열
  const pageNumberButtonArray = Array.from(
    { length: navigationRange.end - navigationRange.start + 1 },
    (_, index) => navigationRange.start + index,
  );

  // 페이지 버튼 클릭시 해당 번호값이 파라미터에 담김
  const handlePageButtonClick = (page: number) => {
    const pageString = page.toString();
    handlePageNumberButtonClick(pageString);
    setNowPageNumberAt(page);
  };

  const handlePrevButtonClick = () => {
    if (nowSection > 0) {
      const prev = (nowSection - 1) * buttonLength + buttonLength;
      setNowSection((cur) => cur - 1);
      handlePageButtonClick(prev);
    }
  };

  const handleNextButtonClick = () => {
    if (nowSection < totalSection) {
      const next = (nowSection + 1) * buttonLength + 1;
      setNowSection((cur) => cur + 1);
      handlePageButtonClick(next);
    }
  };

  const buttonStyle =
    'rounded-full bg-white w-8 h-8 disabled:bg-gray-20 disabled:text-white disabled:cursor-auto';

  return (
    <div className="mt-5 flex h-10 w-full items-center justify-center">
      <div className="flex items-center gap-2">
        <button
          className={twMerge(buttonStyle, 'w-14')}
          disabled={nowSection <= 0}
          onClick={() => {
            handlePrevButtonClick();
          }}
          aria-label="이전으로"
        >
          prev
        </button>
        {pageNumberButtonArray.map((num) => {
          if (totalPage < num) return null;
          return (
            <button
              key={num}
              className={twMerge(buttonStyle, nowPageNumberAt === num && 'bg-primary-2/50')}
              onClick={() => {
                handlePageButtonClick(num);
              }}
              aria-label={`${num} 페이지로 이동`}
              aria-current={nowPageNumberAt === num ? 'page' : undefined}
            >
              {num}
            </button>
          );
        })}
        <button
          className={twMerge(buttonStyle, 'w-14')}
          disabled={nowSection >= totalSection}
          onClick={() => {
            handleNextButtonClick();
          }}
          aria-label="다음 페이지로"
        >
          next
        </button>
      </div>
    </div>
  );
}
