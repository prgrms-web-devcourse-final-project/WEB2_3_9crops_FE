import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { postFirstReply, postLetter, postTemporarySave } from '@/apis/write';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/ConfirmModal';
import WritePageButton from '@/pages/Write/components/WritePageButton';
import { FONT_TYPE_OBJ } from '@/pages/Write/constants';
import OptionSlide from '@/pages/Write/OptionSlide';
import useWrite from '@/stores/writeStore';
import { removeProperty } from '@/utils/removeProperty';
import useToastStore from '@/stores/toastStore';
import { useQueryClient } from '@tanstack/react-query';

export default function LetterEditor({
  letterId,
  setStep,
  prevLetter,
  setSend,
  isReply,
}: {
  letterId: string | null;
  isReply: boolean;
  prevLetter: PrevLetter[];
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setSend: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [randomMatched, setRandomMatched] = useState<boolean>(false);
  const [isTemporaryConfirmModal, setIsTemporaryConfirmModal] = useState<boolean>(false);

  const letterRequest = useWrite((state) => state.letterRequest);
  const setLetterRequest = useWrite((state) => state.setLetterRequest);

  const setToastActive = useToastStore((state) => state.setToastActive);

  const handlePostFirstReply = async (firstReplyRequest: Omit<LetterRequest, 'matchingId'>) => {
    const res = await postFirstReply(firstReplyRequest);
    if (res?.status === 200) {
      setSend(true);
      setStep('category');
    } else {
      alert('전송오류 발생(임시)');
    }
  };

  const handlePostReply = async (letterRequest: LetterRequest) => {
    const res = await postLetter(letterRequest);
    if (res?.status === 200) {
      console.log(letterRequest);
      console.log(prevLetter);
      setSend(true);
      setStep('category');
    } else {
      alert('전송오류(임시)');
    }
  };

  useEffect(() => {
    if (location.state?.randomMatched) {
      setRandomMatched(true);
    }
  }, [location.state?.randomMatched]);

  useEffect(() => {
    if (isReply) {
      console.log('prevLetter', prevLetter);
      setLetterRequest({
        receiverId: prevLetter[0].memberId,
        parentLetterId: Number(letterId),
        category: prevLetter[0].category,
        matchingId: prevLetter[0].matchingId,
      });
    }
  }, [prevLetter, setLetterRequest, isReply]);

  const handlePostTemporarySave = async () => {
    if (!letterId) return alert('임시저장중 오류 발생');
    const LETTER_STATE_DUMMY = false;
    const requestLetterId = LETTER_STATE_DUMMY || null;
    // MEMO : 임시저장 전송 방식 : 최초임시저장은 letterId : null, 임시저장 업데이트는 letterId : location state로 받아오는 임시저장편지의 letterId값
    const temporaryRequest: TemporaryRequest = { ...letterRequest, letterId: requestLetterId };
    const res = await postTemporarySave(temporaryRequest);
    if (res?.status === 200) {
      console.log(res);
      navigate('/');
    } else {
      alert('실패');
    }
  };

  return (
    <div className="flex grow flex-col pb-15">
      {isTemporaryConfirmModal && (
        <ConfirmModal
          title="편지를 임시저장 하시겠어요?"
          description="임시저장된 편지는 홈 화면 공유 버튼에서 확인 가능합니다."
          cancelText="계속 작성하기"
          confirmText="저장하고 나가기"
          onCancel={() => setIsTemporaryConfirmModal(false)}
          onConfirm={() => {
            handlePostTemporarySave();
          }}
        />
      )}
      <OptionSlide prevLetter={prevLetter} />
      <div className="absolute left-0 flex w-full items-center justify-between px-5">
        <BackButton />
        {isReply ? (
          <div className="flex gap-1">
            {!randomMatched && (
              <WritePageButton
                text="임시저장"
                onClick={() => {
                  setIsTemporaryConfirmModal(true);
                }}
              />
            )}
            <WritePageButton
              text="답장 전송"
              onClick={() => {
                if (letterRequest.title.trim() !== '' && letterRequest.content.trim() !== '') {
                  if (randomMatched) {
                    const firstReplyRequest = removeProperty(letterRequest, ['matchingId']);
                    console.log(firstReplyRequest);
                    handlePostFirstReply(firstReplyRequest);
                  } else {
                    handlePostReply(letterRequest);
                  }
                  queryClient.invalidateQueries({ queryKey: ['mailBox'] });
                  queryClient.invalidateQueries({ queryKey: ['mailBoxDetail'] });
                } else {
                  setToastActive({
                    toastType: 'Warning',
                    title: '편지 제목, 내용이 작성되었는지 확인해주세요',
                  });
                }
              }}
            />
          </div>
        ) : (
          <WritePageButton
            text="다음 단계"
            onClick={() => {
              if (letterRequest.title.trim() !== '' && letterRequest.content.trim() !== '') {
                setStep('category');
              } else {
                setToastActive({
                  toastType: 'Warning',
                  title: '편지 제목, 내용이 작성되었는지 확인해주세요',
                });
              }
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 px-6">
        <div className="body-b mt-15">TO. 따숨이에게</div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="body-sb placeholder:text-gray-40 placeholder:border-0"
          onChange={(e) => {
            setLetterRequest({ title: e.target.value });
          }}
          value={letterRequest.title}
        />
      </div>
      <div className="mt-9 flex grow">
        <textarea
          className={twMerge(
            `body-r basic-theme min-h-full w-full resize-none px-6`,
            `${FONT_TYPE_OBJ[letterRequest.fontType]}`,
          )}
          placeholder="클릭해서 내용을 작성하세요"
          onChange={(e) => {
            setLetterRequest({ ...letterRequest, content: e.target.value });
          }}
          value={letterRequest.content}
        ></textarea>
      </div>
    </div>
  );
}
