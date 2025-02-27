import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { postLetter } from '@/apis/write';
import BackButton from '@/components/BackButton';
import WritePageButton from '@/pages/Write/components/WritePageButton';
import { FONT_TYPE_OBJ } from '@/pages/Write/constants';
import OptionSlide from '@/pages/Write/OptionSlide';
import useWrite from '@/stores/writeStore';

export default function LetterEditor({
  setStep,
  prevLetter,
  setSend,
  searchParams,
}: {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  prevLetter: PrevLetter[];
  setSend: React.Dispatch<React.SetStateAction<boolean>>;
  searchParams: URLSearchParams;
}) {
  const location = useLocation();
  const [randomMatched, setRandomMatched] = useState<boolean>(false);

  const letterRequest = useWrite((state) => state.letterRequest);
  const setLetterRequest = useWrite((state) => state.setLetterRequest);

  useEffect(() => {
    if (location.state?.randomMatched) {
      setRandomMatched(true);
    }
  }, [location.state?.randomMatched]);

  useEffect(() => {
    if (prevLetter.length > 0) {
      console.log('d');
      setLetterRequest({
        receiverId: prevLetter[0].memberId,
        parentLetterId: Number(searchParams.get('letterId')),
        category: prevLetter[0].category,
      });
    }
  }, [prevLetter, searchParams, setLetterRequest]);

  return (
    <div className="flex grow flex-col pb-15">
      <OptionSlide prevLetter={prevLetter} />
      <div className="absolute left-0 flex w-full items-center justify-between px-5">
        <BackButton />
        {prevLetter.length > 0 ? (
          <WritePageButton
            text="답장 전송"
            onClick={() => {
              if (letterRequest.title.trim() !== '' && letterRequest.content.trim() !== '') {
                if (randomMatched) {
                  console.log('랜덤편지 답장 전송용API');
                } else {
                  postLetter(letterRequest, () => {
                    console.log(letterRequest);
                    console.log(prevLetter);
                    setSend(true);
                    setStep('category');
                  });
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
