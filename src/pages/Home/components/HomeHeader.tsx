import { Link } from 'react-router';

import { AlarmIcon, PersonIcon } from '@/assets/icons';
import FlareRoundedIcon from '@mui/icons-material/FlareRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import useThemeStore from '@/stores/themeStore';

const HomeHeader = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="fixed top-0 z-40 flex h-16 w-full max-w-150 items-center justify-end p-5">
      <div className="flex items-center gap-3">
        {theme === 'light' ? (
          <FlareRoundedIcon className="h-6 w-6 text-white" onClick={toggleTheme} />
        ) : (
          <DarkModeOutlinedIcon className="h-6 w-6 text-white" onClick={toggleTheme} />
        )}
        <Link to="/mypage/notifications">
          <AlarmIcon className="h-6 w-6 text-white" />
        </Link>
        <Link to="/mypage">
          <PersonIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
