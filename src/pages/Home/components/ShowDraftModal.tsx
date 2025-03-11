import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { DraftLetter, getDraftLetters, deleteDraftLetters } from '@/apis/draftLetters';
import ModalBackgroundWrapper from '@/components/ModalBackgroundWrapper';
import ModalOverlay from '@/components/ModalOverlay';

import useToastStore from '@/stores/toastStore';

interface ShowDraftModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const ShowDraftModal = ({ onClose }: ShowDraftModalProps) => {
  const [draftLetters, setDraftLetters] = useState<DraftLetter[]>([]);

  const navigate = useNavigate();

  const setToastActive = useToastStore((state) => state.setToastActive);

  const handleNavigation = (draft: DraftLetter) => {
    navigate(`/letter/write/?letterId=${draft.parentLetterId}`, {
      state: { draft, isDraft: true },
    });
  };

  const handleGetDraftLetters = () => {
    getDraftLetters()
      .then((data) => {
        setDraftLetters(data || []);
      })
      .catch((error) => {
        console.error('❌ 임시저장된 편지를 불러오는데 실패했습니다', error);
        setToastActive({
          toastType: 'Error',
          title: '서버 오류로 임시저장된 편지를 불러오는 데에 실패했습니다.',
          time: 5,
        });
      });
  };

  const handleDeleteDraftLetters = async (letterId: number) => {
    try {
      await deleteDraftLetters(letterId);
      setDraftLetters((prev) => prev.filter((letter) => letter.letterId !== letterId));
      console.log(`letterId는 `, letterId);
    } catch (error) {
      console.error(`❌임시저장된 편지를 삭제하던 중 에러가 발생했습니다.`, error);
      setToastActive({
        toastType: 'Error',
        title: '서버 오류로 임시저장 된 편지를 삭제하던 중 에러가 발생했습니다.',
        time: 5,
      });
    }
  };

  useEffect(() => {
    handleGetDraftLetters();
  }, [onClose]);

  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          임시저장된 편지가 있어요!
        </p>
        <div className="flex w-73 justify-center">
          <ModalBackgroundWrapper className="relative overflow-hidden rounded-lg p-5">
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">임시저장 편지</p>
            </div>
            <div className="mt-6 flex max-h-60 min-h-auto w-[251px] flex-col gap-[10px] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
              {draftLetters.length > 0 ? (
                draftLetters.map((draft) => (
                  <div
                    className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                    key={draft.letterId}
                    onClick={() => handleNavigation(draft)}
                  >
                    <p className="truncate">{draft.title}</p>
                    <div
                      className="text-gray-20 active:text-gray-600"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDraftLetters(draft.letterId);
                      }}
                    >
                      <DeleteOutlineRoundedIcon />
                    </div>
                  </div>
                ))
              ) : (
                <p className="caption-m text-center text-gray-50">작성 중인 편지가 없어요</p>
              )}
            </div>
          </ModalBackgroundWrapper>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowDraftModal;
