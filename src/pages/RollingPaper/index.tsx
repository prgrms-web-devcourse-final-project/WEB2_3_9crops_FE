import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router';

import { getRollingPaperDetail } from '@/apis/rolling';
import EnvelopeImg from '@/assets/images/closed-letter.png';
import BackgroundBottom from '@/components/BackgroundBottom';
import MessageModal from '@/components/MessageModal';
import PageTitle from '@/components/PageTitle';
import ReportModal from '@/components/ReportModal';
import Header from '@/layouts/Header';

import Comment from './components/Comment';
import CommentDetailModal from './components/CommentDetailModal';

// TODO: 더미 완전히 제거
const DUMMY_USER_ZIP_CODE = '1DR41';
const DUMMY_MESSAGE_COUNT = 20;
const DUMMY_MESSAGE: RollingPaperComment = {
  commentId: 1,
  content:
    '편지 내용 어쩌구저쩌구 뾰로롱 편지 내용 어쩌구저쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 뾰로롱편지 내용 어쩌구 저쩌구 끝~!!',
  zipCode: '12E12',
};
const DUMMY_COMMENT = Array.from({ length: 10 }, () => ({ ...DUMMY_MESSAGE }));

const RollingPaperPage = () => {
  const [activeComment, setActiveComment] = useState<RollingPaperComment | null>(null);
  const [activeReportModal, setActiveReportModal] = useState(false);
  const [activeMessageModal, setActiveMessageModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const id = useParams().id ?? '';
  const { data } = useQuery({
    queryKey: ['rolling-paper', id],
    queryFn: () => getRollingPaperDetail(id),
  });

  const handleReport = () => {
    setActiveComment(null);
    setActiveReportModal(true);
  };

  const handleDelete = () => {
    setActiveComment(null);
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {activeComment !== null && (
        <CommentDetailModal
          comment={activeComment}
          isWriter={activeComment.zipCode === DUMMY_USER_ZIP_CODE}
          onClose={() => setActiveComment(null)}
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
        <PageTitle className="mb-18 max-w-73 text-center">{data?.title}</PageTitle>
        <p className="body-sb text-gray-60 mb-2 w-full">등록된 편지 {DUMMY_MESSAGE_COUNT}</p>
        <section className="w-full">
          <MasonryInfiniteGrid column={2} align="stretch" gap={16}>
            {data &&
              data.eventPostComments.map((comment) => (
                <Comment
                  key={comment.commentId}
                  comment={comment}
                  onClick={() => setActiveComment(comment)}
                />
              ))}
            {DUMMY_COMMENT.map((comment, index) => (
              <Comment key={index} comment={comment} onClick={() => setActiveComment(comment)} />
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
