import { useState } from 'react';

import InformationTooltip from './components/InformationTooltip';
import LetterPreview from './components/LetterPreview';

const DUMMY_ZIP_CODE = '12E12';
const DUMMY_LETTER_LIST = [
  {
    id: 1,
    date: '2025.01.01',
    title: '이건 받은 편지 입니다.이건 받은 편지 입니다.이건 받은 편지 입니다.',
    isSend: false,
  },
  {
    id: 2,
    date: '2025.01.01',
    title: '이건 보낸 편지입니다.',
    isSend: true,
  },
  {
    id: 3,
    date: '2025.01.01',
    title: '이건 받은 편지 입니다.이건 받은 편지 입니다.이건 받은 편지 입니다.',
    isSend: false,
  },
  {
    id: 4,
    date: '2025.01.01',
    title: '이건 받은 편지 입니다.이건 받은 편지 입니다.이건 받은 편지 입니다.',
    isSend: false,
  },
  {
    id: 5,
    date: '2025.01.01',
    title: '이건 보낸 편지입니다.',
    isSend: true,
  },
];

const LetterBoxDetailPage = () => {
  //const { id } = useParams();
  // TODO: PageTitle 컴포넌트로 변경해야 함
  const [isShareMode, setShareMode] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const toggleShareMode = () => {
    if (isShareMode) {
      setSelected([]);
    }
    setShareMode((prev) => !prev);
  };

  const toggleSelected = (selectedId: number) => {
    if (selected.includes(selectedId)) {
      setSelected((prev) => prev.filter((id) => id !== selectedId));
    } else {
      setSelected((prev) => [...prev, selectedId]);
    }
  };

  return (
    <>
      <main className="flex grow flex-col px-5 pt-20 pb-10">
        <p className="text-gray-60 body-b mx-auto w-fit rounded-full bg-white px-6 py-4">
          {isShareMode
            ? '게시판에 올릴 편지를 선택해주세요'
            : `${DUMMY_ZIP_CODE}님과 주고 받은 편지`}
        </p>
        <section className="text-gray-60 body-sb mt-18 mb-2 flex w-full justify-between">
          <p>주고 받은 편지 {DUMMY_LETTER_LIST.length}</p>
          <div className="flex items-center gap-0.5 underline">
            <button type="button" onClick={toggleShareMode}>
              {isShareMode ? '취소하기' : '편지 공유하기'}
            </button>
            {!isShareMode && <InformationTooltip />}
          </div>
        </section>
        <section className="mb-5 flex flex-col gap-4">
          {DUMMY_LETTER_LIST.map((letter) => (
            <LetterPreview
              key={letter.id}
              id={letter.id}
              date={letter.date}
              title={letter.title}
              isSend={letter.isSend}
              checked={selected.includes(letter.id)}
              isShareMode={isShareMode}
              onToggle={() => toggleSelected(letter.id)}
            />
          ))}
        </section>
        {!isShareMode && (
          <button
            type="button"
            className="body-sb text-gray-60 mt-auto text-left underline"
            onClick={() => alert('발신자 차단 클릭하면 하겠냐고 한 번 더 물어보는 게 필요하겠군')}
          >
            발신자 차단
          </button>
        )}
      </main>
      {isShareMode && (
        <div className="left-1/2-translate-x-1/2 fixed bottom-10 z-20 w-full max-w-150 px-5">
          <button type="button" className="body-m primary-btn w-full py-2 text-black">
            다음으로
          </button>
        </div>
      )}
    </>
  );
};

export default LetterBoxDetailPage;
