import { NavLink, useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { AlarmIcon, ArrowDownIcon } from '@/assets/icons';

import { ADMIN_MENU_LIST } from '../constants';
import useAuthStore from '@/stores/authStore';

export default function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <section className="border-gray-10 flex w-65 shrink-0 flex-col border-r">
      <h1 className="bg-primary-3 flex h-14 w-full items-center justify-center gap-2">
        <span className="pt-1 text-base font-medium tracking-[-1px]">마음이 맞닿는 온도</span>
        <span className="font-malang text-2xl text-[#F15847]">36.5</span>
      </h1>
      <section className="mt-2 flex flex-col px-5 py-4">
        <h2 className="body-l-b py-2">현재 로그인 계정</h2>
        <p className="body-l-r py-2">{'wl990@naver.com'}</p>
      </section>
      <hr className="border-gray-20 mx-2.5" />
      <section className="flex flex-col py-5">
        <h2 className="body-l-b px-5 py-2">사이트 관리</h2>
        {ADMIN_MENU_LIST.map((menu) => (
          <div key={menu.title} className="flex flex-col">
            <NavLink
              to={menu.path || '#'}
              className={twMerge(
                'flex w-full items-center gap-3 py-3 pr-3 pl-5 hover:bg-amber-100',
                location.pathname === menu.path && 'bg-primary-2/50',
              )}
            >
              <AlarmIcon className="text-gray-80 h-5 w-5" />
              <span className="text-gray-80 body-l-m">{menu.title}</span>
              {!menu.path && <ArrowDownIcon className="text-gray-80 ml-auto h-6 w-6" />}
            </NavLink>
            <div className="flex flex-col">
              {menu.subMenu &&
                menu.subMenu.map((subMenu) => (
                  <NavLink
                    to={subMenu.path || '#'}
                    key={subMenu.title}
                    className={twMerge(
                      'py-3 pl-16 text-left hover:bg-amber-100',
                      location.pathname === subMenu.path && 'bg-primary-2/50',
                    )}
                  >
                    {subMenu.title}
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
      </section>
      <button className="mt-auto flex w-full items-center gap-3 px-5 py-3 hover:bg-amber-100">
        <AlarmIcon className="text-gray-80 h-5 w-5" />
        <span className="text-gray-80 body-l-m" onClick={() => logout()}>
          로그아웃
        </span>
      </button>
    </section>
  );
}
