import React from 'react';
import ModalBg from '@/assets/images/yellow-modal.png';
import ModalOverlay from '@/components/ModalOverlay';

interface ShowIncomingLettersModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const DUMMY_INCOMING_LETTERS = [
  { id: 1, title: '취업 때문에 고민이 많아요!!', time: '12:00:00' },
  { id: 2, title: '배고파서 죽을 거 같아요 😭', time: '00:00:03' },
  { id: 3, title: '개발하니까 밖에 나갈 일이 없어서 너무 심심하고 피곤해요', time: '00:00:03' },
  { id: 4, title: '마라샹궈 먹고 싶어요', time: '00:00:03' },
];

const ShowIncomingLettersModal = ({ onClose }: ShowIncomingLettersModalProps) => {
  return (
    <ModalOverlay onClick={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          따숨 배달부가 따숨이의 답장을 배달 중이에요!
        </p>
        <div className="flex w-73 justify-center">
          <section className="relative overflow-hidden rounded-lg p-5">
            <img src={ModalBg} className="absolute inset-0 z-[-10] h-full w-full" />
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">오고 있는 편지</p>
              <p className="caption-r text-black">시간은 실제 시간을 기반으로 책정됩니다.</p>
            </div>
            <div className="mt-6 flex w-[251px] flex-col gap-[10px]">
              {DUMMY_INCOMING_LETTERS.map((letter) => (
                <div
                  className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                  key={letter.id}
                >
                  <p className="truncate">{letter.title}</p>
                  <p>{letter.time}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowIncomingLettersModal;
