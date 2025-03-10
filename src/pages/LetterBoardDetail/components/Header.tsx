import { Link, useNavigate } from 'react-router';

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
  isShareLetterPreview?: boolean;
}

const Header = ({
  likeCount,
  isLike,
  isWriter,
  onToggleLike,
  onOpenReportModal,
  isShareLetterPreview = false,
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-40 w-full max-w-150">
      <div className="flex h-16 items-center justify-between bg-white p-5">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="text-primary-1 h-6 w-6" />
        </button>
        {!isShareLetterPreview && (
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
        )}
      </div>
      <div className="h-4 w-full bg-gradient-to-b from-white to-white/0" />
    </header>
  );
};

export default Header;
