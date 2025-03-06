import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { deleteLetter, getLetter } from '@/apis/letterDetail';
import {
  CloudIcon,
  DeleteIcon,
  SirenOutlinedIcon,
  SnowIcon,
  ThermostatIcon,
  WarmIcon,
} from '@/assets/icons';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/ConfirmModal';
import ReportModal from '@/components/ReportModal';
import { FONT_TYPE_OBJ, PAPER_TYPE_OBJ } from '@/pages/Write/constants';
import useAuthStore from '@/stores/authStore';

const LetterDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);
  const userZipCode = useAuthStore((state) => state.zipCode);

  const DEGREES = [
    { icon: <WarmIcon className="h-5 w-5" />, title: '따뜻해요' },
    { icon: <CloudIcon className="h-5 w-5" />, title: '그럭저럭' },
    { icon: <SnowIcon className="h-5 w-5" />, title: '앗! 차가워' },
  ];
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const degreeButtonRef = useRef<HTMLButtonElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target || degreeButtonRef.current?.contains(target)) {
      return;
    }
    setDegreeModalOpen(false);
  };

  const handleDeleteLetter = async (letterId: string) => {
    const res = await deleteLetter(letterId);
    if (res?.status === 200) {
      navigate(-1);
    } else {
      alert('편지 삭제 도중 오류 발생(임시)');
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    const handleGetLetter = async (letterId: string) => {
      const res = await getLetter(letterId);
      if (res?.status === 200) {
        console.log(res);
        setLetterDetail(res.data.data);
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

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
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
        <div className="absolute top-5 left-0 flex w-full justify-between px-5">
          <BackButton />
          <div className="flex gap-2">
            {userZipCode !== letterDetail?.zipCode && (
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
        <span className="body-sb mt-10 flex justify-end">FROM. {letterDetail?.zipCode}</span>
        {userZipCode !== letterDetail?.zipCode && (
          <button
            className="bg-primary-3 disabled:bg-gray-30 body-m mt-3 w-full rounded-lg py-2 disabled:text-white"
            onClick={() => {
              navigate(`/letter/write/?letterId=${letterDetail?.letterId}`);
            }}
            disabled={!letterDetail?.matched}
          >
            {letterDetail?.matched ? '편지 작성하기' : '대화가 종료된 편지입니다.'}
          </button>
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
