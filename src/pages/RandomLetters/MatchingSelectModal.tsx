import ModalOverlay from '@/components/ModalOverlay';
import ResultLetter from '@/components/ResultLetter';

function MatchingSelectModal({
  setOpenModal,
  selectedLetter,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLetter: SelectedLetter;
}) {
  return (
    <ModalOverlay>
      <div className="flex-col items-center justify-center">
        <div className="body-sb flex flex-col items-center gap-1 text-white">
          <span>이 편지에 답장 하시겠어요?</span>
          <span>수락한 편지는 5분이 지나면 취소할 수 없습니다.</span>
        </div>
        <div className="mt-4 w-full">
          <ResultLetter stampName={selectedLetter.stampName} title={selectedLetter.title} />
        </div>
        <div className="mt-12.5 flex w-[300px] gap-4">
          <button
            className="bg-primary-4 body-m h-10 w-[calc(50%-8px)] rounded-lg text-gray-50"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            거부하기
          </button>
          <button
            className="bg-primary-3 body-m h-10 w-[calc(50%-8px)] rounded-lg"
            onClick={() => {
              setOpenModal(false);
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
