import { twMerge } from 'tailwind-merge';

import { FONT_TYPE_OBJ } from '@/pages/Write/constants';

interface LetterDetailContent {
  letterDetail: LetterDetail;
}
export default function LetterDetailContent({ letterDetail }: LetterDetailContent) {
  return (
    <>
      <div className="flex flex-col gap-3 px-5">
        <span className="body-b mt-[55px]">TO. 따숨이</span>
        <span className="body-sb">{letterDetail.title}</span>
      </div>
      <textarea
        readOnly
        value={letterDetail.content}
        className={twMerge(
          `body-r basic-theme min-h-full w-full grow resize-none px-6`,
          letterDetail && FONT_TYPE_OBJ[letterDetail.fontType],
        )}
      ></textarea>
      <span className="body-sb mt-10 flex justify-end">FROM. {letterDetail.zipCode}</span>
    </>
  );
}
