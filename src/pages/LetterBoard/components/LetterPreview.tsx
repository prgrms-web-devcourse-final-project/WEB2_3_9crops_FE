import { forwardRef } from 'react';
import { useNavigate } from 'react-router';

import LetterWrapper from '@/components/LetterWrapper';

interface LetterPreviewProps {
  id: number;
  to: string;
  from: string;
  content: string;
}

const LetterPreview = forwardRef<HTMLDivElement, LetterPreviewProps>((props, ref) => {
  const { id, to, from, content }: LetterPreviewProps = props;
  const navigate = useNavigate();
  return (
    <LetterWrapper className="px-3 py-2" ref={ref} onClick={() => navigate(`/board/letter/${id}`)}>
      <div className="caption-r flex flex-col gap-2">
        <p>From.{from}</p>
        <p className="line-clamp-2 font-light">{content}</p>
        <p className="place-self-end">To.{to}</p>
      </div>
    </LetterWrapper>
  );
});

export default LetterPreview;
