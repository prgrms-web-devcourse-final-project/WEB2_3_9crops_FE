import { useState } from 'react';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import BackButton from '@/components/BackButton';
import ReportModal from '@/components/ReportModal';
import { FONT_TYPE_OBJ, PAPER_TYPE_OBJ } from '@/pages/Write/constants';

const MatchedLetter = ({ selectedLetter }: { selectedLetter: RandomLetters }) => {
  const navigate = useNavigate();
  // 상대방의 우편번호도 데이터에 포함되어야 할 거 같음!!!
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  return (
    <>
      {reportModalOpen && <ReportModal onClose={() => setReportModalOpen(false)} />}
      <div
        className={twMerge(
          `flex grow flex-col gap-3 px-5 pb-7.5`,
          letterDetail && PAPER_TYPE_OBJ[letterDetail.paperType],
        )}
      >
        <div className="absolute top-5 left-0 flex w-full justify-between px-5">
          <BackButton />
        </div>
        <div className="flex flex-col gap-3 px-5">
          <span className="body-b mt-[55px]">TO. 따숨이</span>
          <span className="body-sb">{selectedLetter?.title}</span>
        </div>
        <textarea
          readOnly
          value={letterDetail?.content}
          className={twMerge(
            `body-r basic-theme min-h-full w-full grow px-6`,
            letterDetail && FONT_TYPE_OBJ[letterDetail.fontType],
          )}
        ></textarea>
        <span className="body-sb mt-10 flex justify-end">FROM. {selectedLetter.zipCode}</span>
        <button
          className="bg-primary-3 disabled:bg-gray-30 body-m mt-3 w-full rounded-lg py-2 disabled:text-white"
          onClick={() => {
            navigate(`/letter/write/?letterId=${selectedLetter?.letterId}`);
          }}
        >
          편지 작성하기
        </button>
      </div>
    </>
  );
};

export default MatchedLetter;
