import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getPrevLetter } from '@/apis/write';
import useWrite from '@/stores/writeStore';

import CategorySelect from './CategorySelect';
import { PAPER_TYPE_OBJ } from './constants';
import LetterEditor from './LetterEditor';

const WritePage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const letterId = searchParams.get('letterId');

  const [send, setSend] = useState<boolean>(false);
  const [step, setStep] = useState<Step>('edit');
  const [prevLetter, setPrevLetter] = useState<PrevLetter[]>([]);
  const [isReply, setIsReply] = useState<boolean>(false);

  const letterRequest = useWrite((state) => state.letterRequest);
  const resetLetterRequest = useWrite((state) => state.resetLetterRequest);

  const wrapStyle = twMerge(
    'relative p-5 w-full grow flex flex-col',
    `${step === 'edit' && PAPER_TYPE_OBJ[letterRequest.paperType]}`,
  );

  useEffect(() => {
    // MEMO : letterId는 쿼리파라미터를 통해 얻을수 있음 => 최초답장, 답장만 prevLetter을 받는 로직을 실행함
    if (!letterId) return;
    if (location.state?.randomMatched) {
      console.log('MatchedLetter 담긴 데이터로 prevLetter 생성');
      const matchedLetter: MatchedLetter = location.state?.matchedLetter;
      const matchedPrevLetter: PrevLetter = {
        letterId: matchedLetter.letterId,
        title: matchedLetter.title,
        content: matchedLetter.content,
        category: matchedLetter.category,
        receiverId: 0, // MEMO 최초 편지라 receiverId는 0으로 설정했는데 문제없겠지..?
        memberId: matchedLetter.writerId,
        matchingId: null,
      };
      setPrevLetter([matchedPrevLetter]);
    } else {
      console.log('prevLetter API 요청');
      const handleGetPrevLetter = async (letterId: string) => {
        const res = await getPrevLetter(letterId);
        if (res?.status === 200) {
          setPrevLetter(res.data.data);
        } else {
          alert('이전 편지 데이터를 받아오는 도중 오류가 발생했습니다(잘못된 편지 접근입니다.)');
          navigate(-1);
        }
      };
      handleGetPrevLetter(letterId);
    }
    // MEMO : 진영님이 prevLetter 받아오는 과정에서 매칭되지 않은 유저에 대한 예외처리 에러값을 담아 보내주시면 여기 선에서 잘못된 접근에 대한 리다이렉트를 걸 수 있게됨
    // MEMO : 단, 최초 답장의 경우에 아직 매칭이 되지 않은 상태기 때문에 반드시 에러값을 반환하게 될 걸로 보임 => 에러를 받았을때 분기를 나눠 location.state가 있는지를 확인해봐야함(location은 url조작을 통해 얻을 수 있는 값이 아님)
  }, [location.state, prevLetter.length, navigate, letterId]);

  // useEffect(() => {
  //   // MEMO : 여기서 prevLetter가 텅빈 경우 : 최초 편지 작성이거나 최초 답장일 경우 => 최초답장이면 letterId에 해당하는 prevLetter값이 존재하지 않고 location.state값이 있음
  //   // MEMO : 현재는 목api라 prevLetter의 값이 무조건 0 이상이지만 api 연결되고나면 정상적으로 작동될거 같음
  //   if (prevLetter.length <= 0 && location.state) {
  //     const matchedLetter: MatchedLetter = location.state?.matchedLetter;
  //     const matchedPrevLetter: PrevLetter = {
  //       letterId: matchedLetter.letterId,
  //       title: matchedLetter.title,
  //       content: matchedLetter.content,
  //       category: matchedLetter.category,
  //       receiverId: 0, // MEMO 최초 편지라 receiverId는 0으로 설정했는데 문제없겠지..?
  //       memberId: matchedLetter.writerId,
  //       matchingId: null,
  //     };
  //     setPrevLetter([matchedPrevLetter]);
  //   }
  // }, [location.state, prevLetter.length, navigate, letterId]);

  useEffect(() => {
    if (prevLetter.length > 0) {
      setIsReply(true);
    } else if (letterId) {
      // MEMO : 이전편지 데이터가 없기 때문에 답장이 아닌데 쿼리파라미터값인 letterId가 존재한다 => URL을 조작해 다른 유저의  답장에 들어간거여서 홈으로 리다이렉션 시킴
      // alert('잘못된 접근입니다.');
      // navigate('/');
    }
  }, [letterId, navigate, prevLetter.length]);

  useEffect(() => {
    const navigationGuard = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', navigationGuard);

    return () => {
      window.removeEventListener('beforeunload', navigationGuard);
    };
  }, []);

  useEffect(() => {
    return () => {
      resetLetterRequest();
    };
  }, [resetLetterRequest]);
  return (
    <div className={wrapStyle}>
      {step === 'edit' && (
        <LetterEditor
          setStep={setStep}
          prevLetter={prevLetter}
          setSend={setSend}
          searchParams={searchParams}
          isReply={isReply}
        />
      )}
      {step === 'category' && (
        <CategorySelect setStep={setStep} send={send} setSend={setSend} isReply={isReply} />
      )}
    </div>
  );
};

export default WritePage;
