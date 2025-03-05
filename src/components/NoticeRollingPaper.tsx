import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getCurrentRollingPaper } from '@/apis/rolling';
import { NoticeIcon } from '@/assets/icons';

const NoticeRollingPaper = () => {
  const { data, error } = useQuery({
    queryKey: ['notice-rolling-paper'],
    queryFn: () => getCurrentRollingPaper(),
  });

  const [activeAnimate, setActiveAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (data?.title) {
      const containerElement = containerRef.current;
      const element = textRef.current;

      if (containerElement && element) {
        const textWidth = element.scrollWidth;
        const containerWidth = containerElement.offsetWidth;

        if (textWidth > containerWidth) {
          const animationDuration = (textWidth / 10) * 0.3;
          const totalDuration = Math.max(animationDuration, 10);
          document.documentElement.style.setProperty('--marquee-duration', `${totalDuration}s`);

          setActiveAnimate(true);
        } else {
          setActiveAnimate(false);
        }
      }
    }
  }, [data?.title]);

  const noticeText = data?.title;

  if (error || !noticeText) return null;

  return (
    <Link to={`/board/rolling/${data?.eventPostId}`}>
      <article
        className={twMerge(
          'text-gray-60 flex w-full items-center gap-2.5 rounded-lg px-4 py-2',
          'bg-linear-[275deg,rgba(255,255,255,0.4)_13.74%,rgba(238,238,238,0.4)_67.61%]',
          'shadow-[0_1px_6px_rgba(218,189,74,0.8)]',
        )}
      >
        <NoticeIcon className="h-6 w-6 shrink-0 text-gray-50" />
        <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap">
          <p
            ref={textRef}
            className={twMerge('body-sb inline-block', activeAnimate && 'animate-marquee')}
          >
            {noticeText}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default NoticeRollingPaper;
