import { Link } from 'react-router';

import { PersonIcon } from '@/assets/icons';
import NotificationButton from '@/components/NotificationButton';

const HomeHeader = () => {
  return (
    <header className="fixed top-0 z-40 flex h-16 w-full max-w-150 items-center justify-end p-5">
      <div className="flex items-center gap-3">
        <NotificationButton />
        <Link to="/mypage">
          <PersonIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
