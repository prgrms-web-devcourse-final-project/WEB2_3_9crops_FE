import React, { useEffect } from 'react';

import ModalBackgroundWrapper from '@/components/ModalBackgroundWrapper';
import ModalOverlay from '@/components/ModalOverlay';
import { useIncomingLettersStore } from '@/stores/incomingLettersStore';

interface ShowIncomingLettersModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const ShowIncomingLettersModal = ({ onClose }: ShowIncomingLettersModalProps) => {
  const { data, fetchIncomingLetters } = useIncomingLettersStore();

  useEffect(() => {
    fetchIncomingLetters();
  }, [fetchIncomingLetters]);

  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          따숨 배달부가 따숨이의 답장을 배달 중이에요!
        </p>
        <div className="flex w-73 justify-center">
          <ModalBackgroundWrapper className="relative overflow-hidden rounded-lg p-5">
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">오고 있는 편지</p>
              <p className="caption-r text-black">시간은 실제 시간을 기반으로 책정됩니다.</p>
            </div>
            <div className="mt-6 flex max-h-60 min-h-auto w-[251px] flex-col gap-[10px] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
              {data.length > 0 ? (
                data.map((letter) => (
                  <div
                    className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                    key={letter.letterId}
                  >
                    <p className="truncate">{letter.title}</p>
                    <p>{letter.remainingTime}</p>
                  </div>
                ))
              ) : (
                <p className="caption-m text-center text-gray-50">오고 있는 편지가 없어요</p>
              )}
            </div>
          </ModalBackgroundWrapper>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowIncomingLettersModal;
