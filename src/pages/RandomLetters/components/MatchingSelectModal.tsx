// import { useNavigate } from 'react-router';

import { postRandomLettersApprove } from '@/apis/randomLetter';
import ModalOverlay from '@/components/ModalOverlay';
import ResultLetter from '@/components/ResultLetter';

function MatchingSelectModal({
  setOpenModal,
  selectedLetter,
  setOpenSelectedDetailModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLetter: RandomLetters;
  setOpenSelectedDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const navigate = useNavigate();
  return (
    <ModalOverlay>
      <div className="flex-col items-center justify-center">
        <div className="body-sb flex flex-col items-center gap-1 text-white">
          <span>이 편지에 답장 하시겠어요?</span>
          <span>수락한 편지는 5분이 지나면 취소할 수 없습니다.</span>
        </div>
        <div className="mt-4 w-full">
          <ResultLetter
            categoryName={selectedLetter.category}
            title={selectedLetter.title}
            zipCode={selectedLetter.zipCode}
          />
        </div>
        <div className="mt-12.5 flex w-[300px] gap-4">
          <button
            className="bg-primary-4 body-m h-10 flex-1 basis-1/2 rounded-lg text-gray-50"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            거부하기
          </button>
          <button
            className="bg-primary-3 body-m h-10 flex-1 basis-1/2 rounded-lg"
            onClick={() => {
              postRandomLettersApprove(
                // MEMO 여기서 writerId는 나의 ID인가?
                { letterId: `${selectedLetter.letterId}`, writerId: '1' },
                () => {
                  setOpenModal(false);
                  setOpenSelectedDetailModal(true);
                },
              );
            }}
          >
            승인하기
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
export default MatchingSelectModal;
