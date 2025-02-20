import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { ChangeEvent, useState } from 'react';

import EnvelopeImg from '@/assets/images/closed-letter.png';
import BackgroundBottom from '@/components/BackgroundBottom';
import MessageModal from '@/components/MessageModal';
import PageTitle from '@/components/PageTitle';
import ReportModal from '@/components/ReportModal';
import Header from '@/layouts/Header';

import Message from './components/Message';
import MessageDetailModal from './components/MessageDetailModal';

const DUMMY_USER_ZIP_CODE = '22E12';
const DUMMY_TITLE = '침수 피해를 복구중인 포스코 임직원 분들에게 응원의 메시지를 보내주세요!';
const DUMMY_MESSAGE_COUNT = 20;
const DUMMY_MESSAGE = {
  content:
    '편지 내용 어쩌구저쩌구 뾰로롱 편지 내용 어쩌구저쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 저쩌구 끝~!!',
  sender: '12E12',
};
const DUMMY_MESSAGES = Array.from({ length: 10 }, () => ({ ...DUMMY_MESSAGE }));

const RollingPaperPage = () => {
  const [activeMessageIndex, setActiveMessageIndex] = useState<number | null>(null);
  const [activeReportModal, setActiveReportModal] = useState(false);
  const [activeMessageModal, setActiveMessageModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleReport = () => {
    setActiveMessageIndex(null);
    setActiveReportModal(true);
  };

  const handleDelete = () => {
    setActiveMessageIndex(null);
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {activeMessageIndex !== null && (
        <MessageDetailModal
          message={DUMMY_MESSAGES[activeMessageIndex]}
          isWriter={DUMMY_MESSAGES[activeMessageIndex].sender === DUMMY_USER_ZIP_CODE}
          onClose={() => setActiveMessageIndex(null)}
          onReport={handleReport}
          onDelete={handleDelete}
        />
      )}
      {activeReportModal && <ReportModal onClose={() => setActiveReportModal(false)} />}
      {activeMessageModal && (
        <MessageModal
          inputValue={newMessage}
          placeholder="이곳을 눌러 메시지를 작성해주세요"
          cancelText="취소하기"
          completeText="편지 남기기"
          onInputChange={handleChangeMessage}
          onCancel={() => setActiveMessageModal(false)}
          onComplete={() => setActiveMessageModal(false)}
        >
          <p className="body-r mt-5 text-end text-black">From. {DUMMY_USER_ZIP_CODE}</p>
        </MessageModal>
      )}
      <Header />
      <main className="flex grow flex-col items-center px-5 pt-20 pb-12">
        <PageTitle className="mb-18 max-w-73 text-center">{DUMMY_TITLE}</PageTitle>
        <p className="body-sb text-gray-60 mb-2 w-full">등록된 편지 {DUMMY_MESSAGE_COUNT}</p>
        <section className="w-full">
          <MasonryInfiniteGrid column={2} align="stretch" gap={16}>
            {DUMMY_MESSAGES.map((message, index) => (
              <Message key={index} message={message} onClick={() => setActiveMessageIndex(index)} />
            ))}
          </MasonryInfiniteGrid>
        </section>
        <button
          type="button"
          className="fixed bottom-7.5 left-5 overflow-hidden rounded-sm"
          onClick={() => setActiveMessageModal(true)}
        >
          <img src={EnvelopeImg} alt="편지지 이미지" className="h-12 w-auto opacity-70" />
          <p className="caption-sb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white">
            편지 쓰기
          </p>
        </button>
      </main>
      <BackgroundBottom />
    </>
  );
};

export default RollingPaperPage;
