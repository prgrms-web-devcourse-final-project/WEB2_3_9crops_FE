import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { postNewRollingPaper } from '@/apis/rolling';
import ModalOverlay from '@/components/ModalOverlay';
import { AxiosError } from 'axios';

interface AddRollingPaperModalProps {
  currentPage: number | string;
  onClose: () => void;
}

export default function AddRollingPaperModal({ currentPage, onClose }: AddRollingPaperModalProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postNewRollingPaper(title),
    onSuccess: () => {
      setTitle('');
      setError('');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['admin-rolling-paper', currentPage] });
    },
    onError: (err: AxiosError<{ code: string; message: string }>) => {
      if (err.response?.data.code === 'MOD-003') {
        setError('금칙어가 포함되어 있어요. 다시 작성해주세요.');
      } else {
        setError('편지 작성에 실패했어요. 다시 시도해주세요.');
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('내용을 입력해주세요');
      return;
    }

    mutate();
  };

  return (
    <ModalOverlay>
      <article className="w-100 rounded-lg bg-white p-5">
        <form onSubmit={handleSubmit}>
          <p className="body-m mb-3">어떤 롤링페이퍼를 생성하시겠어요?</p>
          <textarea
            rows={2}
            placeholder="롤링페이퍼 제목을 입력해주세요"
            className="border-gray-20 body-r w-full resize-none rounded-md border p-2"
            value={title}
            onChange={handleChange}
          />
          <p className="caption-m text-accent-1">{error}</p>
          <section className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              className="secondary-btn text-gray-80 body-m flex-1 basis-1/2 px-3 py-2"
              onClick={onClose}
              aria-label="취소하기"
            >
              취소하기
            </button>
            <button
              type="submit"
              className="primary-btn body-m flex-1 basis-1/2 px-3 py-2"
              aria-label="생성하기"
            >
              생성하기
            </button>
          </section>
        </form>
      </article>
    </ModalOverlay>
  );
}
