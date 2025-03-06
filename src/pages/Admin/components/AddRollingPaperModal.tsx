import { ChangeEvent, FormEvent, useState } from 'react';

import ModalOverlay from '@/components/ModalOverlay';

interface AddRollingPaperModalProps {
  onClose: () => void;
}

export default function AddRollingPaperModal({ onClose }: AddRollingPaperModalProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('내용을 입력해주세요');
      return;
    }

    console.log(title);
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
            >
              취소하기
            </button>
            <button type="submit" className="primary-btn body-m flex-1 basis-1/2 px-3 py-2">
              생성하기
            </button>
          </section>
        </form>
      </article>
    </ModalOverlay>
  );
}
