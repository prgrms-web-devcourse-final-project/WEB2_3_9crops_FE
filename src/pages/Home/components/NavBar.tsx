import { Link } from 'react-router';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';

const NavBar = () => {
  return (
    <div className="fixed top-[18px] right-5 flex w-full justify-end gap-x-3 text-white">
      <Link to={'/mypage/notifications'}>
        <NotificationsNoneRoundedIcon />
      </Link>
      <Link to={'/mypage'}>
        <PermIdentityRoundedIcon />
      </Link>
    </div>
  );
};

export default NavBar;
