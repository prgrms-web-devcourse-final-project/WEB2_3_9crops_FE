import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { deleteLetter, getLetter } from '@/apis/letterDetail';
import ConfirmModal from '@/components/ConfirmModal';
import ReportModal from '@/components/ReportModal';
import { PAPER_TYPE_OBJ } from '@/pages/Write/constants';
import useAuthStore from '@/stores/authStore';

import LetterDetailContent from './components/LetterDetailContent';
import LetterDetailHeader from './components/LetterDetailHeader';
import LetterDetailReplyButton from './components/LetterDetailReplyButton';

const LetterDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);
  const userZipCode = useAuthStore((state) => state.zipCode);

  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteLetter = async (letterId: string) => {
    const res = await deleteLetter(letterId);
    if (res?.status === 200) {
      navigate(-1);
    } else {
      alert('편지 삭제 도중 오류 발생(임시)');
    }
  };

  useEffect(() => {
    const handleGetLetter = async (letterId: string) => {
      const res = await getLetter(letterId);
      if (res?.status === 200) {
        const data: LetterDetail = res.data.data;
        setLetterDetail(data);
      } else {
        alert(
          '에러가 발생했거나 존재하지 않거나 따숨님의 편지가 아니에요(임시) - 이거 에러코드 따른 처리 달리해야할듯',
        );
        navigate(-1);
      }
    };
    if (params.id) {
      handleGetLetter(params.id);
    }
  }, [params.id, navigate]);

  return (
    <>
      {reportModalOpen && (
        <ReportModal
          reportType={'LETTER'}
          letterId={letterDetail?.letterId || null}
          onClose={() => setReportModalOpen(false)}
        />
      )}

      <div
        className={twMerge(
          `flex grow flex-col gap-3 px-5 pb-7.5`,
          letterDetail && PAPER_TYPE_OBJ[letterDetail.paperType],
        )}
      >
        <LetterDetailHeader
          letterDetail={letterDetail}
          setDeleteModalOpen={setDeleteModalOpen}
          setReportModalOpen={setReportModalOpen}
        />
        <LetterDetailContent letterDetail={letterDetail} />
        {userZipCode !== letterDetail?.zipCode && (
          <LetterDetailReplyButton letterDetail={letterDetail} />
        )}
        {deleteModalOpen && (
          <ConfirmModal
            title="편지를 삭제하시겠습니까?"
            description="삭제된 편지는 복구할 수 없습니다."
            cancelText="취소"
            confirmText="삭제"
            onCancel={() => {
              setDeleteModalOpen(false);
            }}
            onConfirm={() => {
              if (params.id) handleDeleteLetter(params.id);
              navigate(-1);
            }}
          />
        )}
      </div>
    </>
  );
};

export default LetterDetailPage;
