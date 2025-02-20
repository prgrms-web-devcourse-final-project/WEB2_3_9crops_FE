import { useEffect, useRef, useState } from 'react';
import { ELEMENTS } from '../constants/index';

interface SpinnerProps {
  target: string;
  index: number;
}

const Spinner = ({ target, index }: SpinnerProps) => {
  const newArr = ELEMENTS.filter((item) => item !== target);
  const TARGET_ARR = [target, ...newArr.sort(() => Math.random() - 0.5), target];
  const SPEED = 100 + 10 * index;
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  let LETTER_HEIGHT = 40;
  const animationFrameRef = useRef<number | null>(null);

  //TODO: 여러 기기에서 실효성 확인
  // 웹에서는 없어도 될 것 같음
  // calculate full height of the cycle
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      console.log(LETTER_HEIGHT);
      const letter = containerRef.current.querySelector('p');
      if (letter) {
        LETTER_HEIGHT = letter.getBoundingClientRect().height;
      }
    }
    console.log(LETTER_HEIGHT);
  }, []);
  const FULL_ROTATION = -TARGET_ARR.length * LETTER_HEIGHT;

  useEffect(() => {
    if (!isRunning) return;

    let lastTime = performance.now();
    const frameRate = 1000 / 60;

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      if (deltaTime >= frameRate) {
        setPosition((prev) => {
          let newPos = prev - LETTER_HEIGHT * (deltaTime / SPEED);

          if (newPos < FULL_ROTATION) {
            newPos = 0;
            setIsRunning(false);
            return newPos;
          }
          return newPos;
        });
        lastTime = time;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div
      className="bg-gray-10 flex h-13.5 w-10 -translate-y-20 flex-col items-center overflow-hidden rounded-sm inset-shadow-[0_4px_4px_0] inset-shadow-black/10"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={containerRef}
        className="text-center transition-transform duration-500 ease-linear"
        style={{ transform: `translateY(${position}px)` }}
      >
        {TARGET_ARR.map((item, index) => {
          return (
            <p key={index} className="h1-b">
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Spinner;
