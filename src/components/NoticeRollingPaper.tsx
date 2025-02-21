import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getCurrentRollingPaper } from '@/apis/rolling';
import { NoticeIcon } from '@/assets/icons';
import { useFetchQuery } from '@/hooks/useFetchQuery';

const DUMMY = '11월 15일은 수능! 고생하는 수험생들을 위해 응원의 편지를 적어주세요!';

const NoticeRollingPaper = () => {
  const { data } = useFetchQuery({
    queryKey: ['notice-rolling-paper'],
    queryFn: () => getCurrentRollingPaper(),
  });

  const noticeText = data?.title ?? DUMMY;

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
        <div className="w-full overflow-hidden">
          <p className="body-sb animate-marquee whitespace-nowrap">{noticeText}</p>
        </div>
      </article>
    </Link>
  );
};

export default NoticeRollingPaper;
