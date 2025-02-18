import celebration from '@/assets/images/celebration.png';
import consolation from '@/assets/images/consolation.png';
import cunsult from '@/assets/images/consult.png';
import etc from '@/assets/images/etc.png';

import CategoryStamp from './CategoryStamp';

function CategoryList() {
  return (
    <div className="mt-[70px] flex w-[80%] flex-wrap justify-between gap-6 px-5">
      <div className="w-[calc(50%-12px)]">
        <CategoryStamp title="위로와 공감" image={consolation} />
        <p className="body-m mt-2 flex items-center justify-center">위로와 공감</p>
      </div>
      <div className="w-[calc(50%-12px)]">
        <CategoryStamp title="축하와 응원" image={celebration} />
        <p className="body-m mt-2 flex items-center justify-center">축하와 응원</p>
      </div>
      <div className="w-[calc(50%-12px)]">
        <CategoryStamp title="고민 상담" image={cunsult} />
        <p className="body-m mt-2 flex items-center justify-center">고민 상담</p>
      </div>
      <div className="w-[calc(50%-12px)]">
        <CategoryStamp title="기타" image={etc} />
        <p className="body-m mt-2 flex items-center justify-center">기타</p>
      </div>
    </div>
  );
}

export default CategoryList;
