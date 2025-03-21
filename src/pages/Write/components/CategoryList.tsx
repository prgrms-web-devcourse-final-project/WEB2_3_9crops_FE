import { CATEGORY_STAMPS } from '../constants';

import CategoryStamp from './CategoryStamp';

function CategoryList() {
  return (
    <div className="mt-[70px] flex w-[80%] flex-wrap justify-between gap-6 px-5">
      {CATEGORY_STAMPS.map((stamp, idx) => {
        return (
          <div className="w-[calc(50%-12px)]" key={idx}>
            <CategoryStamp categoryName={stamp.category} image={stamp.image} />
            <p className="body-m mt-2 flex items-center justify-center dark:text-white">
              {stamp.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryList;
