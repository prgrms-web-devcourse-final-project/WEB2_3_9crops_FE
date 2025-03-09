import { useState } from 'react';

import { DeleteIcon, SirenOutlinedIcon } from '@/assets/icons';
import BackButton from '@/components/BackButton';
import useAuthStore from '@/stores/authStore';

import DegreeSelector from './DegreeSelector';
import LetterDetailDegreeButton from './LetterDetailDegreeButton';

interface LetterDetailHeader {
  letterDetail: LetterDetail;
  setLetterDetail: React.Dispatch<React.SetStateAction<LetterDetail>>;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReportModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LetterDetailHeader({
  letterDetail,
  setLetterDetail,
  setDeleteModalOpen,
  setReportModalOpen,
}: LetterDetailHeader) {
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);

  const userZipCode = useAuthStore((state) => state.zipCode);

  return (
    <div className="absolute top-5 left-0 flex w-full justify-between px-5">
      <BackButton />
      <div className="flex gap-2">
        {userZipCode !== letterDetail?.zipCode && (
          <LetterDetailDegreeButton
            letterDetail={letterDetail}
            setDegreeModalOpen={setDegreeModalOpen}
          />
        )}
        {userZipCode === letterDetail?.zipCode && (
          <button
            onClick={() => {
              setDeleteModalOpen(true);
            }}
          >
            <DeleteIcon className="text-primary-1 h-6 w-6" />
          </button>
        )}
        {userZipCode !== letterDetail?.zipCode && (
          <button
            onClick={() => {
              setReportModalOpen(true);
            }}
          >
            <SirenOutlinedIcon className="text-primary-1 h-6 w-6" />
          </button>
        )}
        {degreeModalOpen && (
          <DegreeSelector letterDetail={letterDetail} setLetterDetail={setLetterDetail} />
        )}
      </div>
    </div>
  );
}
