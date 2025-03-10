import { Link, useNavigate } from 'react-router';

import { ArrowLeftIcon, PersonIcon } from '@/assets/icons';
import NotificationButton from '@/components/NotificationButton';
import FlareRoundedIcon from '@mui/icons-material/FlareRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import useThemeStore from '@/stores/themeStore';

const Header = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-40 flex h-16 w-full max-w-150 items-center justify-between p-5">
      <button onClick={() => navigate(-1)}>
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <div className="flex items-center gap-3">
        {theme === 'light' ? (
          <FlareRoundedIcon className="h-6 w-6 text-white" onClick={toggleTheme} />
        ) : (
          <DarkModeOutlinedIcon className="h-6 w-6 text-white" onClick={toggleTheme} />
        )}
        <NotificationButton />
        <Link to="/mypage">
          <PersonIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
