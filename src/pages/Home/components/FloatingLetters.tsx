import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import letter1 from '@/assets/images/letter-1.png';
import letter2 from '@/assets/images/letter-2.png';
import letter3 from '@/assets/images/letter-3.png';
import letter4 from '@/assets/images/letter-4.png';

const images = [letter1, letter2, letter3, letter4];

const FloatingLetters = () => {
  const lettersRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    if (!lettersRef.current) return;

    lettersRef.current.forEach((letter, index) => {
      gsap.to(letter, {
        // x: Math.random() * 50 - 40,
        y: Math.random() * 20 - 40 + 'vh', // 위아래 이동
        rotation: Math.random() * 50 - 25, // 회전
        duration: Math.random() * 3 + 2, // 지속 시간
        repeat: -1, // 무한 반복
        yoyo: true, // 왕복
        ease: 'power1.inOut',
        delay: index * 1, // 편지마다 시차
      });
    });
  }, []);
  return (
    <>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          ref={(el) => {
            if (el) lettersRef.current[index] = el;
          }}
          className="absolute w-20 opacity-90"
          style={{
            left: `${index * 30 + 30}px`, // 편지지 간격
            top: '60vh',
          }}
        />
      ))}
    </>
  );
};

export default FloatingLetters;
