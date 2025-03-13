import { postEvaluateLetter } from '@/apis/letterDetail';
import { CloudIcon, SnowIcon, WarmIcon } from '@/assets/icons';

interface DegreeSelector {
  letterDetail: LetterDetail | null;
  setLetterDetail: React.Dispatch<React.SetStateAction<LetterDetail>>;
}
export default function DegreeSelector({ letterDetail, setLetterDetail }: DegreeSelector) {
  const handlePostEvaluateLetter = async (
    letterId: number | undefined,
    evaluation: LetterEvaluation,
  ) => {
    if (!letterId) return alert('편지id값이 담겨있지 않습니다.');
    const res = await postEvaluateLetter(letterId, evaluation);
    if (res?.status === 200) {
      console.log('평가완료');
      setLetterDetail((cur) => ({ ...cur, evaluated: true }));
    }
  };
  const DEGREES = [
    {
      icon: <WarmIcon className="h-5 w-5" />,
      title: '따뜻해요',
      onClick: () => {
        handlePostEvaluateLetter(letterDetail?.letterId, 'GOOD');
      },
    },
    {
      icon: <CloudIcon className="h-5 w-5" />,
      title: '그럭저럭',
      onClick: () => {
        handlePostEvaluateLetter(letterDetail?.letterId, 'SOSO');
      },
    },
    {
      icon: <SnowIcon className="h-5 w-5" />,
      title: '앗! 차가워',
      onClick: () => {
        handlePostEvaluateLetter(letterDetail?.letterId, 'BAD');
      },
    },
  ];
  return (
    <div className="caption-b text-primary-1 bg-primary-5 absolute top-7 z-40 flex flex-col gap-1 p-2 shadow">
      {DEGREES.map((degree, idx) => {
        return (
          <button
            key={idx}
            className="flex items-center justify-start gap-1"
            onClick={() => {
              degree.onClick();
            }}
            aria-label="따숨 온도"
          >
            {degree.icon}
            {degree.title}
          </button>
        );
      })}
    </div>
  );
}
