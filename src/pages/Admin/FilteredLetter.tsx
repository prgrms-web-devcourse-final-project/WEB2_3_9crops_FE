import { AlarmIcon } from '@/assets/icons';

import FilteredLetterListItem from './components/FilteredLetterListItem';
import ListHeaderFrame from './components/ListHeaderFrame';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';

export default function FilteredLetter() {
  const arr = new Array(10).fill(null);
  return (
    <WrapperFrame className="mt-7">
      <WrapperTitle title="필터링 단어로 차단된 편지 목록" Icon={AlarmIcon} />
      <section className="mt-5 flex flex-col">
        <ListHeaderFrame>
          <span className="admin-list-set basis-1/10">ID</span>
          <span className="admin-list-set basis-2/10">제보자 이메일</span>
          <span className="admin-list-set basis-2/10">작성자 이메일</span>
          <span className="admin-list-set basis-2/10">차단 일자</span>
          <span className="admin-list-set basis-2/10">포함된 단어</span>
        </ListHeaderFrame>
        {arr.map((_, idx) => {
          return <FilteredLetterListItem key={idx} />;
        })}
      </section>
    </WrapperFrame>
  );
}
