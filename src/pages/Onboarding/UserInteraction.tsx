import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import envelope from '@/assets/images/closed-letter.png';
import envelopeFront from '@/assets/images/opened-letter-front.png';

export default function UserInteraction({
  setIsAnimationOver,
}: {
  setIsAnimationOver: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgPos, setImgPos] = useState<{
    top: number;
    width: number;
    height: number;
    left: number;
  }>({
    top: 0,
    width: 0,
    height: 0,
    left: 0,
  });
  const [imgToBottom, setImgToBottom] = useState<boolean>(false);

  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  const [letterOutAnimation, setLetterOutAnimation] = useState<boolean>(false);
  const [envelopeOut, setEnvelopeOut] = useState<boolean>(false);
  const [finishAnimation, setFinishAnimation] = useState<boolean>(false);

  const handleLetterClick = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setImgPos({ top: rect.top, width: rect.width, height: rect.height, left: rect.left });
    }
    setStartAnimation(true);
    setTimeout(() => {
      setImgToBottom(true);
    }, 1000);
  };

  useEffect(() => {
    if (imgToBottom) {
      setTimeout(() => {
        setLetterOutAnimation(true);
      }, 1000);
    }
  }, [imgToBottom]);

  useEffect(() => {
    if (letterOutAnimation) {
      setTimeout(() => {
        setEnvelopeOut(true);
      }, 2000);
    }
  }, [letterOutAnimation]);

  useEffect(() => {
    if (envelopeOut) {
      setTimeout(() => {
        setFinishAnimation(true);
      }, 1000);
    }
  }, [envelopeOut]);

  useEffect(() => {
    if (finishAnimation) {
      setTimeout(() => {
        setIsAnimationOver(true);
      }, 2000);
    }
  }, [finishAnimation]);

  if (startAnimation === false) {
    return (
      <>
        <header className="flex flex-col items-center">
          <h1 className="message-header body-b mb-2">이제 편지를 보내러 가볼까요?</h1>
        </header>
        <section className="mt-25 flex w-full grow flex-col place-items-center items-center px-10">
          <p className="comment caption-m animate-float mb-8">편지를 눌러보세요!</p>
          <img
            role="button"
            ref={imgRef}
            src={envelope}
            alt="분홍색 편지지"
            className="h-auto w-full rounded transition-transform duration-1000 ease-in-out hover:scale-105"
            onClick={handleLetterClick}
            aria-label="분홍색 편지를 눌러보세요!"
          />
        </section>
      </>
    );
  } else {
    return (
      <div className="relative h-[calc(100vh-110px)] w-full overflow-hidden">
        <img
          src={envelopeFront}
          alt=""
          className={twMerge(
            `transform-translation z-30 mx-10 h-auto rounded`,
            imgToBottom && !envelopeOut && 'animate-envelopeSink',
            envelopeOut && 'animate-envelopeOut',
          )}
          style={{
            top: `calc(${imgPos.top}px - 5rem)`,
            position: 'absolute',
            width: `${imgPos.width}px`,
            left: '0px',
          }}
        />
        <img
          src={envelope}
          alt="분홍색 편지지"
          className={twMerge(
            `z-0 mx-10 h-auto rounded`,
            imgToBottom && !envelopeOut && 'animate-envelopeSink',
            envelopeOut && 'animate-envelopeOut',
          )}
          style={{
            top: `calc(${imgPos.top}px - 5rem)`,
            position: 'absolute',
            width: `${imgPos.width}px`,
            left: '0px',
          }}
        />
        {letterOutAnimation && (
          <div
            className={twMerge(
              'letter-gradient z-20 max-w-[600px] rounded-lg',
              finishAnimation ? 'animate-fadeOut' : 'animate-expandScale',
            )}
            style={{
              width: `${imgPos.width - imgPos.width * 0.1}px`,
              bottom: `${120}px`,
              top: `${imgPos.top - 0.7 * imgPos.top}px`,
              position: 'absolute',
              left: `58px`,
            }}
          ></div>
        )}
      </div>
    );
  }
}
