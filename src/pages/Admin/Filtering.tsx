import { useEffect, useState } from 'react';

import { getBadWords, patchBadWordsUsed } from '@/apis/admin';
import { AddIcon, AlarmIcon, CancelIcon } from '@/assets/icons';

import AddInputButton from './components/AddInputButton';
import AdminPageTitle from './components/AdminPageTitle';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';
import FilterTextItem from './components/FilterTextItem';

export default function FilteringManage() {
  const [badWords, setBadWords] = useState<BadWordsData[]>([]);
  const [addInputShow, setAddInputShow] = useState<boolean>(false);

  const handleGetBadWords = async () => {
    const res = await getBadWords();
    if (res?.status === 200) {
      setBadWords(res.data.data);
    } else {
      console.log('검열 조회 오류 발생');
    }
  };

  useEffect(() => {
    handleGetBadWords();
  }, []);
  return (
    <>
      <AdminPageTitle>검열 관리 / 필터링 단어 설정</AdminPageTitle>
      <WrapperFrame>
        <WrapperTitle title="필터링 단어" Icon={AlarmIcon} />
        <div className="mt-5 flex w-full flex-wrap gap-4">
          {badWords.map((badWord) => {
            return <FilterTextItem key={badWord.id} badWord={badWord} setBadWords={setBadWords} />;
          })}
          {addInputShow ? (
            <AddInputButton setAddInputShow={setAddInputShow} setBadWords={setBadWords} />
          ) : (
            <span className="bg-primary-3 flex items-center gap-1.5 rounded-2xl px-4 py-1.5">
              추가하기
              <button
                onClick={() => {
                  setAddInputShow(true);
                }}
              >
                <AddIcon className="h-4 w-4" />
              </button>
            </span>
          )}
        </div>
      </WrapperFrame>
    </>
  );
}
