import React from 'react';
import ModalBg from '@/assets/images/modal-yellow.png';
import ModalOverlay from '@/components/ModalOverlay';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

interface ShowDraftModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const DUMMY_DRAFT = [
  { id: 1, title: '취업 때문에 고민이 많아요!!' },
  { id: 2, title: '배고파서 죽을 거 같아요 😭' },
  { id: 3, title: '개발하니까 밖에 나갈 일이 없어서 너무 심심하고 피곤해요' },
  { id: 4, title: '마라샹궈 먹고 싶어요' },
];

const ShowDraftModal = ({ onClose }: ShowDraftModalProps) => {
  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          임시저장된 편지가 있어요!
        </p>
        <div className="flex w-73 justify-center">
          <section className="relative overflow-hidden rounded-lg p-5">
            <img src={ModalBg} className="absolute inset-0 z-[-10] h-full w-full" />
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">임시저장 편지</p>
              <p className="caption-r text-black">로그아웃 시 임시 저장된 편지는 사라집니다</p>
            </div>
            <div className="mt-6 flex w-[251px] flex-col gap-[10px]">
              {DUMMY_DRAFT.map((draft) => (
                <div
                  className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                  key={draft.id}
                >
                  <p className="truncate">{draft.title}</p>
                  <div className="text-gray-20">
                    <DeleteOutlineRoundedIcon />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowDraftModal;
