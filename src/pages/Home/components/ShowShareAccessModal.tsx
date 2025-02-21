import React from 'react';
import ModalBg from '@/assets/images/modal-yellow.png';
import ModalOverlay from '@/components/ModalOverlay';
import { useNavigate } from 'react-router';

interface ShowShareAccessModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const DUMMY_SHARE_ACCESS = [
  { id: 1, zip_code: '235EA' },
  { id: 2, zip_code: '711PO' },
  { id: 3, zip_code: '105CF' },
  { id: 4, zip_code: '299EB' },
];

const ShowShareAccessModal = ({ onClose }: ShowShareAccessModalProps) => {
  const navigate = useNavigate();

  const handleNavigation = (accessId: number) => {
    navigate(`/board/letter/${accessId}`, {
      state: { isShareLetterPreview: true },
    });
  };
  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          공유 요청이 왔어요!
        </p>
        <div className="flex w-73 justify-center">
          <section className="relative overflow-hidden rounded-lg p-5">
            <img src={ModalBg} className="absolute inset-0 z-[-10] h-full w-full" />
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">게시판 공유 승인하기</p>
              <p className="caption-r text-black">
                따숨님과 주고받은 추억을 게시판에 공유하고 싶으신 분이 있어요. 클릭해서 확인하고,
                허락 여부를 체크해주세요!
              </p>
            </div>
            <div className="mt-6 flex w-[251px] flex-col gap-[10px]">
              {DUMMY_SHARE_ACCESS.map((access) => (
                <button
                  className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                  key={access.id}
                  onClick={() => handleNavigation(access.id)}
                >
                  <p>{access.zip_code}님의 공유 요청</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowShareAccessModal;
