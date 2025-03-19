import { useNavigate } from 'react-router';

interface LetterDetailReplyButton {
  letterDetail: LetterDetail;
}
export default function LetterDetailReplyButton({ letterDetail }: LetterDetailReplyButton) {
  const navigate = useNavigate();
  return (
    <button
      className="bg-primary-3 disabled:bg-gray-30 body-m mt-3 w-full rounded-lg py-2 disabled:text-white"
      onClick={() => {
        navigate(`/letter/write/?letterId=${letterDetail.letterId}`);
      }}
      disabled={!letterDetail?.matched}
      aria-label={letterDetail?.matched ? '편지 작성하기' : '대화가 종료된 편지입니다.'}
    >
      {letterDetail?.matched ? '편지 작성하기' : '대화가 종료된 편지입니다.'}
    </button>
  );
}
