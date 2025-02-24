import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { postRollingPaperComment } from '@/apis/rolling';
import EnvelopeImg from '@/assets/images/closed-letter.png';
import MessageModal from '@/components/MessageModal';

const DUMMY_USER_ZIP_CODE = '1DR41';

interface WriteCommentButtonProps {
  rollingPaperId: string;
}

const WriteCommentButton = ({ rollingPaperId }: WriteCommentButtonProps) => {
  const [activeMessageModal, setActiveMessageModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (content: string) => postRollingPaperComment(rollingPaperId, content),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['rolling-paper', rollingPaperId] });
      setNewMessage('');
      setError(null);
      setActiveMessageModal(false);
    },
    onError: () => {
      setError('편지 작성에 실패했어요. 다시 시도해주세요.');
    },
  });

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleAddComment = () => {
    console.log(rollingPaperId);
    // 추가 가능한지 조건 확인
    if (newMessage.trim() === '') {
      setError('편지를 작성해주세요.');
      return;
    }

    mutate(newMessage.trim());
  };

  return (
    <>
      {activeMessageModal && (
        <MessageModal
          inputValue={newMessage}
          placeholder="이곳을 눌러 메시지를 작성해주세요"
          cancelText="취소하기"
          completeText="편지 남기기"
          onInputChange={handleChangeMessage}
          onCancel={() => setActiveMessageModal(false)}
          onComplete={handleAddComment}
        >
          <p className="body-r text-accent-1 mt-1">{error}</p>
          <p className="body-r mt-5 text-end text-black">From. {DUMMY_USER_ZIP_CODE}</p>
        </MessageModal>
      )}
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
    </>
  );
};

export default WriteCommentButton;
