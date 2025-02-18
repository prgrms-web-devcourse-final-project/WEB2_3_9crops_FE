import { twMerge } from 'tailwind-merge';

import { NoticeIcon } from '@/assets/icons';

const DUMMY_CONTENT =
  '11월 15일은 수능! 고생하는 수험생들을 위해 응원의 11월 15일은 수능! 고생하는 수험 11월 15일은 수능! 고생하는 수험';

const NoticeRolling = () => {
  return (
    <article
      className={twMerge(
        'text-gray-60 flex w-full items-center gap-2.5 rounded-lg px-4 py-2',
        'bg-linear-[275deg,rgba(255,255,255,0.4)_13.74%,rgba(238,238,238,0.4)_67.61%]',
        'shadow-[0_1px_6px_rgba(218,189,74,0.8)]',
      )}
    >
      <NoticeIcon className="h-6 w-6 text-gray-50" />
      <p className="body-sb line-clamp-1">{DUMMY_CONTENT}</p>
    </article>
  );
};

export default NoticeRolling;
