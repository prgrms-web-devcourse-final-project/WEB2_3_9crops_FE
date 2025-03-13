import LetterWrapper from '@/components/LetterWrapper';
import ModalOverlay from '@/components/ModalOverlay';
import { useNavigate } from 'react-router';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export default function SendingModal({
  isOpenSendingModal,
  setIsOpenSendingModal,
}: {
  isOpenSendingModal: boolean;
  setIsOpenSendingModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  if (!isOpenSendingModal) return null;
  const onClose = () => {
    setIsOpenSendingModal(false);
  };
  return (
    <>
      <ModalOverlay closeOnOutsideClick onClose={onClose}>
        <LetterWrapper className="w-77">
          <div className="caption-r flex flex-col gap-2">
            <h2 className="body-b mb-3">편지 도착</h2>
            <span>편지는 작성된 시점으로 1시간 이후에 도착합니다.</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span>남은시간은 홈 화면의 편지 도착 시간 버튼 </span>
                <SendOutlinedIcon fontSize="small" />
              </div>
              <span>을 눌러 확인 가능합니다.</span>
            </div>
            <button
              className="body-b mt-3 flex items-center justify-center"
              onClick={() => navigate('/')}
              aria-label="홈 화면으로 이동"
            >
              홈 화면으로 이동 {'>'}
            </button>
          </div>
        </LetterWrapper>
      </ModalOverlay>
    </>
  );
}
