import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { deleteLetter, getLetter } from '@/apis/letterDetail';
import { CloudIcon, SirenOutlinedIcon, SnowIcon, ThermostatIcon, WarmIcon } from '@/assets/icons';
import ReportModal from '@/components/ReportModal';
import { FONT_TYPE_OBJ, PAPER_TYPE_OBJ } from '@/pages/Write/constants';

const LetterDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  // 상대방의 우편번호도 데이터에 포함되어야 할 거 같음!!!
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);

  const DEGREES = [
    { icon: <WarmIcon className="h-5 w-5" />, title: '따뜻해요' },
    { icon: <CloudIcon className="h-5 w-5" />, title: '그럭저럭' },
    { icon: <SnowIcon className="h-5 w-5" />, title: '앗! 차가워' },
  ];
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  const degreeButtonRef = useRef<HTMLButtonElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target || degreeButtonRef.current?.contains(target)) {
      return;
    }
    setDegreeModalOpen(false);
  };
  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    if (params.id) {
      getLetter(params.id, setLetterDetail);
      // 편지 삭제 요청 테스트(내일 삭제 버튼 만들어서 여기다 추가하긔)
      deleteLetter(params.id);
    }

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [params.id]);
  return (
    <>
      {reportModalOpen && <ReportModal onClose={() => setReportModalOpen(false)} />}
      <div
        className={twMerge(
          `flex grow flex-col gap-3 px-5 pb-7.5`,
          letterDetail && PAPER_TYPE_OBJ[letterDetail.paperType],
        )}
      >
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            ref={degreeButtonRef}
            className="flex items-center justify-center gap-1"
            onClick={() => {
              setDegreeModalOpen((cur) => !cur);
            }}
          >
            <ThermostatIcon className="h-6 w-6" />
            <span className="caption-b text-primary-1">편지 온도</span>
          </button>
          <button
            onClick={() => {
              setReportModalOpen(true);
            }}
          >
            <SirenOutlinedIcon className="text-primary-1 h-6 w-6" />
          </button>
          {degreeModalOpen && (
            <div className="caption-b text-primary-1 bg-primary-5 absolute top-7 z-40 flex flex-col gap-1 p-2 shadow">
              {DEGREES.map((degree, idx) => {
                return (
                  <button
                    key={idx}
                    className="flex items-center justify-start gap-1"
                    onClick={() => {
                      console.log(idx);
                    }}
                  >
                    {degree.icon}
                    {degree.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 px-5">
          <span className="body-b mt-[55px]">TO. 따숨이</span>
          <span className="body-sb">{letterDetail?.title}</span>
        </div>
        <textarea
          readOnly
          value={letterDetail?.content}
          className={twMerge(
            `body-r basic-theme min-h-full w-full grow px-6`,
            letterDetail && FONT_TYPE_OBJ[letterDetail.fontType],
          )}
        ></textarea>
        <span className="body-sb mt-10 flex justify-end">FROM. {'12E12'}</span>
        <button
          className="bg-primary-3 body-m mt-3 w-full rounded-lg py-2"
          onClick={() => {
            navigate(`/letter/write/?letterId=${letterDetail?.letterId}`);
          }}
        >
          편지 작성하기
        </button>
      </div>
    </>
  );
};

export default LetterDetailPage;
