import { useNavigate } from 'react-router';

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
  onDeleteLetter: () => void;
  isShareLetterPreview?: boolean;
}

const Header = ({
  likeCount,
  isLike,
  isWriter,
  onToggleLike,
  onOpenReportModal,
  onDeleteLetter,
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 z-40 w-full max-w-150">
      <div className="flex h-16 items-center justify-between bg-white p-5">
        <button onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ArrowLeftIcon className="text-primary-1 h-6 w-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleLike}
              aria-label={isLike ? '좋아요 취소' : '좋아요'}
            >
              {isLike ? (
                <LikeFilledIcon className="text-primary-1 h-6 w-6" />
              ) : (
                <LikeOutlinedIcon className="text-primary-1 h-6 w-6" />
              )}
            </button>
            <p className="body-l-m text-primary-1">{likeCount}</p>
          </div>
          {isWriter ? (
            <DeleteIcon className="text-primary-1 h-6 w-6" onClick={onDeleteLetter} />
          ) : (
            <button type="button" onClick={onOpenReportModal} aria-label="신고하기">
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
