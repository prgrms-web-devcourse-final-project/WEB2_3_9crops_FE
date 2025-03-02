import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { postFirstReply, postLetter } from '@/apis/write';
import BackButton from '@/components/BackButton';
import WritePageButton from '@/pages/Write/components/WritePageButton';
import { FONT_TYPE_OBJ } from '@/pages/Write/constants';
import OptionSlide from '@/pages/Write/OptionSlide';
import useWrite from '@/stores/writeStore';
import { removeProperty } from '@/utils/removeProperty';

export default function LetterEditor({
  setStep,
  prevLetter,
  setSend,
  searchParams,
  isReply,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  prevLetter: PrevLetter[];
  setSend: React.Dispatch<React.SetStateAction<boolean>>;
  searchParams: URLSearchParams;
  isReply: boolean;
}) {
  const location = useLocation();
  const [randomMatched, setRandomMatched] = useState<boolean>(false);

  const letterRequest = useWrite((state) => state.letterRequest);
  const setLetterRequest = useWrite((state) => state.setLetterRequest);

  const handlePostFirstReply = async (firstReplyRequest: Omit<LetterRequest, 'matchingId'>) => {
    const res = await postFirstReply(firstReplyRequest);
    if (res?.status === 200) {
      setSend(true);
      setStep('category');
    } else {
      alert('전송오류 발생(임시)');
    }
  };

  // MEMO : 답장 전송 matchingId가 undefined로 나오는데 뭐 때문인지 내일 찾아보자 ㅎ
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
      setLetterRequest({
        receiverId: prevLetter[0].memberId,
        parentLetterId: Number(searchParams.get('letterId')),
        category: prevLetter[0].category,
        matchingId: prevLetter[0].matchingId,
      });
    }
  }, [prevLetter, searchParams, setLetterRequest, isReply]);

  return (
    <div className="flex grow flex-col pb-15">
      <OptionSlide prevLetter={prevLetter} />
      <div className="absolute left-0 flex w-full items-center justify-between px-5">
        <BackButton />
        {isReply ? (
          <WritePageButton
            text="답장 전송"
            onClick={() => {
              if (letterRequest.title.trim() !== '' && letterRequest.content.trim() !== '') {
                if (randomMatched) {
                  const firstReplyRequest = removeProperty(letterRequest, 'matchingId');
                  console.log(firstReplyRequest);
                  handlePostFirstReply(firstReplyRequest);
                } else {
                  handlePostReply(letterRequest);
                }
              } else {
                alert('편지 제목, 내용이 작성되었는지 확인해주세요');
              }
            }}
          />
        ) : (
          <WritePageButton
            text="다음 단계"
            onClick={() => {
              if (letterRequest.title.trim() !== '' && letterRequest.content.trim() !== '') {
                setStep('category');
              } else {
                alert('편지 제목, 내용이 작성되었는지 확인해주세요');
              }
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 px-6">
        <div className="body-b mt-15">TO. {'12EE1'}</div>
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
            `body-r basic-theme min-h-full w-full px-6`,
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
