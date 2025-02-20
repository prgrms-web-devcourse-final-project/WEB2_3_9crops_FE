import { useState } from 'react';
import { Navigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import LandingImg from '@/assets/images/landing.png';

import { STYLE_CLASS } from './constants';

const Landing = () => {
  const [step, setStep] = useState(0);

  if (step === 3) return <Navigate to="/login" />;

  return (
    <main
      className="relative flex grow justify-center overflow-hidden"
      onClick={() => setStep((prev) => prev + 1)}
    >
      <img
        src={LandingImg}
        alt="서비스 소개 이미지"
        className={twMerge(
          'absolute bottom-0 h-70 w-auto max-w-none -translate-x-1/2 transition-all duration-200',
          STYLE_CLASS[step].imagePosition,
        )}
      />
      <section
        className={twMerge(
          'fixed z-1 -translate-x-1/2 transition-all duration-200',
          STYLE_CLASS[step].mask,
        )}
      >
        <p
          className={twMerge(
            'body-sb absolute z-2 w-max -translate-x-1/2 whitespace-pre-wrap text-white transition-all duration-200',
            STYLE_CLASS[step].textPosition,
          )}
        >
          {STYLE_CLASS[step].description}
        </p>
        <div
          className={twMerge(
            'rounded-full shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]',
            STYLE_CLASS[step].circle,
          )}
        />
      </section>
    </main>
  );
};

export default Landing;
