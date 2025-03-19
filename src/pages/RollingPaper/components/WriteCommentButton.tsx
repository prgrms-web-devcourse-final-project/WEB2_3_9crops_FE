import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { postRollingPaperComment } from '@/apis/rolling';
import EnvelopeImg from '@/assets/images/closed-letter.png';
import MessageModal from '@/components/MessageModal';
import useAuthStore from '@/stores/authStore';
import { AxiosError } from 'axios';

interface WriteCommentButtonProps {
  rollingPaperId: string;
}

const WriteCommentButton = ({ rollingPaperId }: WriteCommentButtonProps) => {
  const [activeMessageModal, setActiveMessageModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const zipCode = useAuthStore((props) => props.zipCode);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (content: string) => postRollingPaperComment(rollingPaperId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rolling-paper', rollingPaperId] });
      setNewMessage('');
      setError(null);
      setActiveMessageModal(false);
    },
    onError: (err: AxiosError<{ code: string; message: string }>) => {
      if (err.response?.data.code === 'MOD-003') {
        setError('금칙어가 포함되어 있어요. 다시 작성해주세요.');
      } else {
        setError('편지 작성에 실패했어요. 다시 시도해주세요.');
      }
    },
  });

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleAddComment = () => {
    if (newMessage.trim() === '') {
      setError('편지를 작성해주세요.');
      return;
    }

    mutate(newMessage.trim());
  };

  useEffect(() => {
    setError(null);
  }, [activeMessageModal]);

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
          <p className="body-r mt-5 text-end text-black">From. {zipCode}</p>
        </MessageModal>
      )}
      <button
        type="button"
        className="sticky bottom-8 z-10 mt-auto -mb-4 self-start overflow-hidden rounded-sm"
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
