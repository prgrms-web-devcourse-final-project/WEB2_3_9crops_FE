// import { useNavigate } from 'react-router';

import { postRandomLettersApprove } from '@/apis/randomLetter';
import ModalOverlay from '@/components/ModalOverlay';
import ResultLetter from '@/components/ResultLetter';

function MatchingSelectModal({
  setOpenModal,
  selectedLetter,
  setMatchedLetter,
  setOpenSelectedDetailModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLetter: RandomLetters;
  setMatchedLetter: React.Dispatch<React.SetStateAction<MatchedLetter>>;
  setOpenSelectedDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handlePostRandomLettersApprove = async (approveRequest: ApproveRequest) => {
    const res = await postRandomLettersApprove(approveRequest);
    if (res?.status === 200) {
      setOpenModal(false);
      // MEMO : 이제 랜덤 편지 승인하기 데이터에 랜덤 편지 최종 매칭 시간 검증과 동일한 response 값이 담겨서 그 값을 matchedLetter의 상태 업데이트 값으로 사용하면 됨
      setMatchedLetter(res.data.data);
      setOpenSelectedDetailModal(true);
    }
  };
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
            aria-label="거부하기"
          >
            거부하기
          </button>
          <button
            className="bg-primary-3 body-m h-10 flex-1 basis-1/2 rounded-lg"
            onClick={() => {
              handlePostRandomLettersApprove({
                letterId: `${selectedLetter.letterId}`,
                writerId: `${selectedLetter.writerId}`,
              });
            }}
            aria-label="승인하기"
          >
            승인하기
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
export default MatchingSelectModal;
