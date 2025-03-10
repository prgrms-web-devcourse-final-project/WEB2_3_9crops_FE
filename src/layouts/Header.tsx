import { Link, useNavigate } from 'react-router';

import { ArrowLeftIcon, PersonIcon } from '@/assets/icons';
import NotificationButton from '@/components/NotificationButton';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-40 flex h-16 w-full max-w-150 items-center justify-between p-5">
      <button onClick={() => navigate(-1)}>
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <div className="flex items-center gap-3">
        <NotificationButton />
        <Link to="/mypage">
          <PersonIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
