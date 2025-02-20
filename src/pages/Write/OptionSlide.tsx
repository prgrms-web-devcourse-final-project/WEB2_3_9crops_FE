import { useEffect, useRef, useState } from 'react';

import FontOption from './components/FontOption';
import PreviousLetterOption from './components/PreviousLetterOption';
import ThemeOption from './components/ThemeOption';
import WritePageButton from './components/WritePageButton';

function OptionSlide({ prevLetter }: { prevLetter: PrevLetter }) {
  const [target, setTarget] = useState<Option>('편지지');
  const [slideActive, setSlideActive] = useState<boolean>(false);
  const buttonTitle = ['편지지', '글꼴', '이전 편지 내용'];

  const slideRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSlideButton = () => {
      // ref가 처음 높이를 못 받아오는거 같아서 비동기로 후처리함
      setTimeout(() => {
        if (slideRef.current) {
          if (slideActive) {
            slideRef.current.style.transform = `translateY(${0}px)`;
          } else {
            slideRef.current.style.transform = `translateY(${optionRef.current?.offsetHeight}px)`;
          }
        }
      }, 0);
      if (!slideRef.current?.style.transition) {
        setTimeout(() => {
          if (slideRef.current) slideRef.current.style.transition = 'all .3s';
        }, 100);
      }
    };
    handleSlideButton();
  }, [slideActive]);

  return (
    <div
      ref={slideRef}
      className="bg-primary-3 fixed bottom-0 left-[50%] flex w-full max-w-[600px] translate-x-[-50%] flex-col rounded-t-[20px]"
    >
      <div className="border-primary-1 flex cursor-pointer items-center justify-between border-b-2 px-4 pt-6 pb-4">
        <div className="flex gap-2">
          <WritePageButton
            text={buttonTitle[0]}
            bgColor="white"
            rounded="lg"
            target={target}
            slideActive={slideActive}
            onClick={() => {
              if (target !== buttonTitle[0]) {
                setTarget('편지지');
                setSlideActive(() => true);
              }
              if (target === buttonTitle[0]) {
                if (slideActive) {
                  setSlideActive(false);
                } else {
                  setSlideActive(true);
                }
              }
            }}
          />
          <WritePageButton
            text={buttonTitle[1]}
            bgColor="white"
            rounded="lg"
            target={target}
            slideActive={slideActive}
            onClick={() => {
              if (target !== buttonTitle[1]) {
                setTarget('글꼴');
                setSlideActive(() => true);
              }
              if (target === buttonTitle[1]) {
                if (slideActive) {
                  setSlideActive(false);
                } else {
                  setSlideActive(true);
                }
              }
            }}
          />
        </div>
        {prevLetter && (
          <WritePageButton
            text={buttonTitle[2]}
            bgColor="white"
            rounded="lg"
            target={target}
            slideActive={slideActive}
            onClick={() => {
              if (target !== buttonTitle[2]) {
                setTarget('이전 편지 내용');
                setSlideActive(() => true);
              }
              if (target === buttonTitle[2]) {
                if (slideActive) {
                  setSlideActive(false);
                } else {
                  setSlideActive(true);
                }
              }
            }}
          />
        )}
      </div>
      <div ref={optionRef}>
        {!target && <div className="h-50 w-full"></div>}
        {target === '편지지' && <ThemeOption />}
        {target === '글꼴' && <FontOption />}
        {target === '이전 편지 내용' && <PreviousLetterOption prevLetter={prevLetter} />}
      </div>
    </div>
  );
}

export default OptionSlide;
