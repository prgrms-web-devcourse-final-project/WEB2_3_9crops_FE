import { Link } from 'react-router';

import { PersonIcon } from '@/assets/icons';
import FlareRoundedIcon from '@mui/icons-material/FlareRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import useThemeStore from '@/stores/themeStore';
import NotificationButton from '@/components/NotificationButton';

const HomeHeader = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="fixed top-0 z-40 flex h-16 w-full max-w-150 items-center justify-end p-5">
      <div className="flex items-center gap-3">
        {theme === 'light' ? (
          <DarkModeOutlinedIcon className="h-6 w-6 text-white" onClick={toggleTheme} />
        ) : (
          <FlareRoundedIcon className="h-6 w-6 text-white" onClick={toggleTheme} />
        )}
        <NotificationButton />
        <Link to="/mypage" aria-label="마이페이지로 이동">
          <PersonIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
