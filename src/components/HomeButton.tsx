import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router';

export default function HomeButton() {
  return (
    <>
      <div className="flex w-full max-w-150 justify-end pr-5 text-center">
        <Link
          to="/"
          className="bg-primary-3 fixed bottom-[30px] z-50 h-13 w-13 content-center rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-90"
        >
          <HomeOutlinedIcon />
        </Link>
      </div>
    </>
  );
}
