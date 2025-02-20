import { Link } from 'react-router';

import {
  ArrowLeftIcon,
  DeleteIcon,
  LikeFilledIcon,
  LikeOutlinedIcon,
  SirenOutlinedIcon,
} from '@/assets/icons';

interface HeaderProps {
  likeCount: number;
  isLike: boolean;
  isWriter: boolean;
  onToggleLike: () => void;
  onOpenReportModal: () => void;
}

const Header = ({ likeCount, isLike, isWriter, onToggleLike, onOpenReportModal }: HeaderProps) => {
  return (
    <header className="fixed top-0 z-40 w-full max-w-150">
      <div className="flex h-16 items-center justify-between bg-white p-5">
        <Link to="/board/letter">
          <ArrowLeftIcon className="text-primary-1 h-6 w-6" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button type="button" onClick={onToggleLike}>
              {isLike ? (
                <LikeFilledIcon className="text-primary-1 h-6 w-6" />
              ) : (
                <LikeOutlinedIcon className="text-primary-1 h-6 w-6" />
              )}
            </button>
            <p className="body-l-m text-primary-1">{likeCount}</p>
          </div>
          {isWriter ? (
            <DeleteIcon className="text-primary-1 h-6 w-6" />
          ) : (
            <button type="button" onClick={onOpenReportModal}>
              <SirenOutlinedIcon className="text-primary-1 h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      <div className="h-4 w-full bg-gradient-to-b from-white to-white/0" />
    </header>
  );
};

export default Header;
