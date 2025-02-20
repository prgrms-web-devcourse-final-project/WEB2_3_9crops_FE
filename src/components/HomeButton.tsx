import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router';

export default function HomeButton() {
  return (
    <>
      <Link
        to="/"
        className="bg-primary-3 absolute right-5 bottom-[30px] z-50 flex h-13 w-13 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-90"
      >
        <HomeOutlinedIcon />
      </Link>
    </>
  );
}
