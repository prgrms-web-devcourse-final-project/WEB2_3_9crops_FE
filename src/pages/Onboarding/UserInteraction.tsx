import envelope from '@/assets/images/envelope-pink.png';
import envelopeFront from '@/assets/images/envelope-pink-front.png';
import envelopeTop from '@/assets/images/envelope-pink-back-top.png';

import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export default function UserInteraction() {
  const [startAnimation, setStartAnimation] = useState<Boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgPos, setImgPos] = useState<{ top: number; width: number }>({ top: 0, width: 0 });
  const [imgToBottom, setImgToBottom] = useState<Boolean>(false);

  const handleLetterClick = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setImgPos({ top: rect.top, width: rect.width });
    }
    setStartAnimation(true);
    setTimeout(() => {
      setImgToBottom(true);
    }, 1000);
  };
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
          />
        </section>
      </>
    );
  } else {
    return (
      <>
        <img
          src={envelopeFront}
          alt="분홍색 편지지"
          className={twMerge(
            `z-10 mx-10 h-auto rounded transition-transform duration-1000 ease-in-out`,
            imgToBottom && 'translate-y-full',
          )}
          style={{ top: `${imgPos.top}px`, position: 'absolute', width: `${imgPos.width}px` }}
        />
        <img
          src={envelope}
          alt="분홍색 편지지"
          className={twMerge(
            `z-0 mx-10 h-auto rounded transition-transform duration-1000 ease-in-out`,
            imgToBottom && 'translate-y-full',
          )}
          style={{ top: `${imgPos.top}px`, position: 'absolute', width: `${imgPos.width}px` }}
        />
        {/* <img
          src={envelopeTop}
          alt="분홍색 편지지"
          className={twMerge(
            `z-30 mx-10 h-auto rounded transition-transform duration-1000 ease-in-out`,
            imgToBottom && 'translate-y-full',
          )}
          style={{ top: `${imgPos.top}px`, position: 'absolute', width: `${imgPos.width}px` }}
        /> */}
      </>
    );
  }
}
