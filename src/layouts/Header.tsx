import { Link } from 'react-router';

import { AlarmIcon, ArrowLeftIcon, PersonIcon } from '@/assets/icons';

const Header = () => {
  // TODO: 뒤로 가기 버튼이 보이는 조건 추가
  // TODO: 스크롤 발생 시, 어떻게 보여져야 하는지
  return (
    <header className="fixed top-0 z-40 flex h-16 w-full max-w-150 items-center justify-between p-5">
      <ArrowLeftIcon className="h-6 w-6 text-white" />
      <div className="flex items-center gap-3">
        <Link to="/mypage/notifications">
          <AlarmIcon className="h-6 w-6 text-white" />
        </Link>
        <PersonIcon className="h-6 w-6 text-white" />
      </div>
    </header>
  );
};

export default Header;
