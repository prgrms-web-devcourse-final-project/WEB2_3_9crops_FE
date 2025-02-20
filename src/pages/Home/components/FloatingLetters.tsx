import { useEffect, useRef } from 'react';
import gsap from 'gsap';
const FloatingLetters = () => {
  const lettersRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    if (!lettersRef.current) return;

    lettersRef.current.forEach((letter, index) => {
      gsap.to(letter, {
        // x: Math.random() * 50 - 40,
        y: Math.random() * 20 - 25 + 'vh', // 위아래 이동
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
      {Array.from({ length: 4 }).map((_, index) => (
        <img
          key={index}
          src={`/src/assets/letter_${index + 1}.png`}
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
