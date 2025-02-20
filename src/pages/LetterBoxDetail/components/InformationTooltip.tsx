import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { InformationIcon } from '@/assets/icons';
const InformationTooltip = () => {
  const [isShow, setIsShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShow(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center">
      <button type="button" onClick={() => setIsShow((prev) => !prev)}>
        <InformationIcon className="text-gray-40 h-5 w-5" />
      </button>
      <article
        className={twMerge(
          'bg-gray-5 absolute top-6 -right-1 z-20 w-75 rounded-md p-4 drop-shadow-sm transition-opacity duration-200',
          isShow ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <p className="body-sb px-1">나만 보기 아까운 편지, 함께 나눠요!</p>
        <hr className="text-gray-30 mt-1 mb-2" />
        <p className="caption-m px-1">
          주고받은 편지 중 감동적이거나 도움이 된 편지를 공유 게시판에 등록해 더 많은 사람들과
          따뜻한 마음을 나눌 수 있어요.
        </p>
      </article>
    </div>
  );
};

export default InformationTooltip;
