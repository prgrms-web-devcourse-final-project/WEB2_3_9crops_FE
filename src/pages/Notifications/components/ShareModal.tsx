import LetterWrapper from '@/components/LetterWrapper';
import ModalOverlay from '@/components/ModalOverlay';
import { useNavigate } from 'react-router';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export default function ShareModal({
  isOpenShareModal,
  setIsOpenShareModal,
}: {
  isOpenShareModal: boolean;
  setIsOpenShareModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  if (!isOpenShareModal) return null;
  const onClose = () => {
    setIsOpenShareModal(false);
  };
  return (
    <>
      <ModalOverlay closeOnOutsideClick onClose={onClose}>
        <LetterWrapper className="w-77">
          <div className="caption-r flex flex-col gap-2">
            <h2 className="body-b mb-3">편지 공유</h2>
            <span>따숨이님과의 편지를 공유하고 싶어합니다!</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span>공유 요청은 홈 화면의 편지 공유 버튼 </span>
                <ShareOutlinedIcon fontSize="small" />
              </div>
              <span>을 눌러 확인 가능합니다.</span>
            </div>
            <button
              className="body-b mt-3 flex items-center justify-center"
              onClick={() => navigate('/')}
            >
              홈 화면으로 이동 {'>'}
            </button>
          </div>
        </LetterWrapper>
      </ModalOverlay>
    </>
  );
}
