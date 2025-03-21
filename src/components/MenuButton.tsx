import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import { useState } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex w-full max-w-150 justify-end pr-5 text-center">
        <Link
          to="/letter/box"
          className={twMerge(
            'bg-primary-3 fixed bottom-[220px] z-30 flex h-12 w-12 rotate-360 content-center items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-90',
            isOpen
              ? 'translate-y-0 rotate-0 opacity-100'
              : 'pointer-events-none translate-y-[120%] rotate-180 opacity-0',
          )}
          onClick={() => setIsOpen(false)}
          aria-label="내 편지함으로 이동하기"
        >
          <MarkunreadOutlinedIcon fontSize="small" />
        </Link>
        <Link
          to="/board/letter"
          className={twMerge(
            'bg-primary-3 fixed bottom-[160px] z-30 flex h-12 w-12 rotate-360 content-center items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-90',
            isOpen
              ? 'translate-y-0 rotate-0 opacity-100'
              : 'pointer-events-none translate-y-[120%] rotate-180 opacity-0',
          )}
          onClick={() => setIsOpen(false)}
          aria-label="게시판으로 이동하기"
        >
          <CalendarTodayOutlinedIcon fontSize="small" />
        </Link>
        <Link
          to="/letter/write"
          className={twMerge(
            'bg-primary-3 fixed bottom-[100px] z-30 flex h-12 w-12 rotate-360 content-center items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-90',
            isOpen
              ? 'translate-y-0 rotate-0 opacity-100'
              : 'pointer-events-none translate-y-[120%] rotate-180 opacity-0',
          )}
          onClick={() => setIsOpen(false)}
          aria-label="속마음 나누기로 이동하기"
        >
          <EditNoteRoundedIcon fontSize="medium" />
        </Link>

        <button
          className={twMerge(
            'bg-primary-3 fixed bottom-[30px] z-30 flex h-13 w-13 content-center items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-90',
            isOpen ? 'rotate-90' : 'rotate-0',
          )}
          onClick={() => setIsOpen((state) => !state)}
          aria-label="메뉴 열기"
        >
          <MenuRoundedIcon />
        </button>
      </div>
    </>
  );
}
