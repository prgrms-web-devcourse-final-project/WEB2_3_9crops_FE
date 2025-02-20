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

  // calculate full height of the cycle
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      const letter = containerRef.current.querySelector('p');
      if (letter) {
        LETTER_HEIGHT = letter.getBoundingClientRect().height;
      }
    }
  });
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
        className="text-center transition-transform duration-100 ease-linear"
        style={{ transform: `translateY(${position}px)`, transitionDuration: '500ms' }}
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
