import envelope from '@/assets/images/closed-letter.png';
import envelopeFront from '@/assets/images/opened-letter-front.png';
import envelopeTop from '@/assets/images/envelope-pink-back-top.png';

import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router';

export default function UserInteraction() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgPos, setImgPos] = useState<{ top: number; width: number }>({ top: 0, width: 0 });
  const [imgToBottom, setImgToBottom] = useState<Boolean>(false);

  const [startAnimation, setStartAnimation] = useState<Boolean>(false);
  const [openAnimation, setOpenAnimation] = useState<Boolean>(false);
  const [letterOutAnimation, setLetterOutAnimation] = useState<Boolean>(false);
  const [envelopeOut, setEnvelopeOut] = useState<Boolean>(false);
  const [finishAnimation, setFinishAnimation] = useState<Boolean>(false);

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

  useEffect(() => {
    if (imgToBottom) {
      setTimeout(() => {
        setOpenAnimation(true);
      }, 1000);
    }
  }, [imgToBottom]);

  useEffect(() => {
    if (openAnimation) {
      setTimeout(() => {
        setLetterOutAnimation(true);
      }, 2000);
    }
  }, [openAnimation]);

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
      }, 2000);
    }
  }, [envelopeOut]);
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
            `z-30 mx-10 h-auto rounded transition-transform duration-1000 ease-in-out`,
            imgToBottom && 'translate-y-full',
            envelopeOut && 'animate-envelopeOut',
          )}
          style={{
            top: `${imgPos.top}px`,
            position: 'absolute',
            width: `${imgPos.width}px`,
          }}
        />
        {letterOutAnimation && (
          <div
            className="animate-expandScale to-gray-5 z-20 max-w-[600px] rounded-lg bg-linear-to-b from-white"
            style={{
              width: `${imgPos.width - imgPos.width * 0.1}px`,
              bottom: `${imgPos.top - 0.7 * imgPos.top}px`,
              top: `${imgPos.top - 0.5 * imgPos.top}px`,
              position: 'absolute',
            }}
          ></div>
        )}
        {openAnimation && (
          <img
            src={envelopeTop}
            alt=""
            className={twMerge(
              `z-10 mx-10 h-auto rounded transition-transform duration-1000 ease-in-out`,
              imgToBottom && 'translate-y-full',
              openAnimation && 'animate-openEnvelope',
              envelopeOut && 'animate-envelopeOut',
            )}
            style={{
              top: `${imgPos.top}px`,
              position: 'absolute',
              width: `${imgPos.width}px`,
              transformOrigin: 'bottom',
            }}
          />
        )}
        <img
          src={envelope}
          alt="분홍색 편지지"
          className={twMerge(
            `z-0 mx-10 h-auto rounded transition-transform duration-1000 ease-in-out`,
            imgToBottom && 'translate-y-full',
            envelopeOut && 'animate-envelopeOut',
          )}
          style={{
            top: `${imgPos.top}px`,
            position: 'absolute',
            width: `${imgPos.width}px`,
          }}
        />
        {/* TODO: 편지지 링크 */}
        {finishAnimation && <Link to={'/'}></Link>}
      </>
    );
  }
}
