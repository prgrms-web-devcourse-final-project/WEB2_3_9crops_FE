import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';

import EnvelopeImg from '@/assets/images/envelope.png';
import BgItem from '@/assets/images/field-4.png';
import PageTitle from '@/components/PageTitle';
import Header from '@/layouts/Header';

import Message from './components/Message';

const DUMMY_TITLE = '침수 피해를 복구중인 포스코 임직원 분들에게 응원의 메시지를 보내주세요!';
const DUMMY_MESSAGE_COUNT = 20;

const DUMMY_CONTENT_1 =
  '편지 내용 어쩌구저쩌구 뾰로롱 편지 내용 어쩌구저쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 저쩌구 끝~!!';
const DUMMY_CONTENT_2 = '구현해보고 정신없지 않은 범위 기준으로 자를까요?';

const RollingPaperPage = () => {
  return (
    <>
      <Header />
      <main className="flex grow flex-col items-center px-5 pt-4 pb-12">
        <PageTitle className="mb-18 max-w-73 text-center">{DUMMY_TITLE}</PageTitle>
        <p className="body-sb text-gray-60 w-full">등록된 편지 {DUMMY_MESSAGE_COUNT}</p>
        <section className="w-full">
          <MasonryInfiniteGrid column={2} align="stretch" gap={16}>
            {Array.from({ length: DUMMY_MESSAGE_COUNT }).map((_, index) => (
              <Message key={index} content={index % 3 === 0 ? DUMMY_CONTENT_1 : DUMMY_CONTENT_2} />
            ))}
          </MasonryInfiniteGrid>
        </section>
        <button type="button" className="fixed bottom-7.5 left-5 overflow-hidden rounded-sm">
          <img src={EnvelopeImg} alt="편지지 이미지" className="h-12 w-auto opacity-70" />
          <p className="caption-sb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white">
            메시지 쓰기
          </p>
        </button>
      </main>
      <div
        className="fixed bottom-[-40px] left-1/2 z-[-10] h-42 w-full -translate-x-1/2 bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center opacity-70"
        style={{ '--bg-image': `url(${BgItem})` } as React.CSSProperties}
      />
    </>
  );
};

export default RollingPaperPage;
