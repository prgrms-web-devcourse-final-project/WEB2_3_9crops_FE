import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { postFirstReply, postLetter, postTemporaryLetter, postTemporarySave } from '@/apis/write';
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
      setToastActive({ title: '편지 전송을 완료했습니다.', toastType: 'Success' });
    } else if (res?.status === 400) {
      setToastActive({ title: '편지에 검열단어가 포함되어있습니다.', toastType: 'Error' });
    } else {
      setToastActive({ title: '전송중 오류가 발생했습니다.', toastType: 'Error' });
    }
  };

  const handlePostReply = async (letterRequest: LetterRequest) => {
    const res = await postLetter(letterRequest);
    if (res?.status === 200) {
      setSend(true);
      setStep('category');
      setToastActive({ title: '편지 전송을 완료했습니다.', toastType: 'Success' });
    } else if (res?.status === 400) {
      setToastActive({ title: '편지에 검열단어가 포함되어있습니다.', toastType: 'Error' });
    } else {
      setToastActive({ title: '전송중 오류가 발생했습니다.', toastType: 'Error' });
    }
  };

  const handlePostTemporarySave = async () => {
    if (!letterId) return alert('임시저장중 오류 발생');
    const requestLetterId = location.state?.draft.letterId || null;
    // MEMO : 임시저장 전송 방식 : 최초임시저장은 letterId : null, 임시저장 업데이트는 letterId : location state로 받아오는 임시저장편지의 letterId값
    const temporaryRequest: TemporaryRequest = { ...letterRequest, letterId: requestLetterId };
    const res = await postTemporarySave(temporaryRequest);
    if (res?.status === 200) {
      setToastActive({ title: '임시저장을 완료했습니다.', toastType: 'Success' });
      navigate('/');
    } else {
      setToastActive({ title: '임시저장에 실패했습니다.', toastType: 'Error' });
    }
  };

  const handleTemporaryLetter = async (temporaryRequest: TemporaryRequest) => {
    const res = await postTemporaryLetter(temporaryRequest);
    if (res?.status === 200) {
      setSend(true);
      setStep('category');
      setToastActive({ title: '편지 전송을 완료했습니다.', toastType: 'Success' });
    } else if (res?.status === 400) {
      setToastActive({ title: '편지에 검열단어가 포함되어있습니다.', toastType: 'Error' });
    } else {
      setToastActive({ title: '전송중 오류가 발생했습니다.', toastType: 'Error' });
    }
  };

  useEffect(() => {
    if (location.state?.randomMatched) {
      setRandomMatched(true);
    }
  }, [location.state?.randomMatched]);

  useEffect(() => {
    if (isReply) {
      setLetterRequest({
        receiverId: prevLetter[0].memberId,
        parentLetterId: Number(letterId),
        category: prevLetter[0].category,
        matchingId: prevLetter[0].matchingId,
      });
    }
  }, [prevLetter, setLetterRequest, isReply]);

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
                    handlePostFirstReply(firstReplyRequest);
                  } else {
                    if (location.state?.isDraft) {
                      const temporaryRequest: TemporaryRequest = {
                        ...letterRequest,
                        letterId: location.state.draft.letterId,
                      };
                      handleTemporaryLetter(temporaryRequest);
                    } else {
                      handlePostReply(letterRequest);
                    }
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
          maxLength={50}
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
          maxLength={1000}
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
