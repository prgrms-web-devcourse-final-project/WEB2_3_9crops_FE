import DoorImg from '@/assets/images/door.png';
import { chunkBox } from '@/utils/chunkBox';

import LetterBoxItem from './components/LetterBoxItem';

const DUMMY_COUNT = 200;

const LetterBoxPage = () => {
  return (
    <main className="flex grow flex-col items-center px-5 pt-20">
      <p className="text-gray-60 body-b w-fit rounded-full bg-white px-6 py-4">내 편지함</p>
      <div className="w-full max-w-[375px]">
        <p className="body-sb mt-16 mb-2 place-self-start text-gray-50">
          나와 연락한 사람들 {DUMMY_COUNT}
        </p>
        <section className="letter-box-bg flex grow flex-col items-center px-4 pt-5">
          <div className="flex w-full flex-col gap-5">
            {chunkBox(
              Array.from({ length: 12 }).map((_, index) => (
                <LetterBoxItem
                  key={index}
                  zipCode="12E12"
                  letterCount={90}
                  isSend={index % 2 === 0}
                />
              )),
            ).map((row, index) => (
              <div key={index} className="flex justify-between">
                {row}
              </div>
            ))}
            <div className="flex justify-between">
              <LetterBoxItem zipCode="12E12" letterCount={90} isClosed />
              <img src={DoorImg} alt="출입문 이미지" />
              <LetterBoxItem zipCode="12E12" letterCount={90} isClosed />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LetterBoxPage;
