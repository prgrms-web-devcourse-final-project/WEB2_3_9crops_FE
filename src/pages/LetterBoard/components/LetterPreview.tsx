import { Link } from 'react-router';

import LetterWrapper from '@/components/LetterWrapper';

interface LetterPreviewProps {
  id: string;
  to: string;
  from: string;
  content: string;
}

const LetterPreview = ({ id, to, from, content }: LetterPreviewProps) => {
  return (
    <Link to={id}>
      <LetterWrapper className="px-3 py-2">
        <div className="caption-r flex flex-col gap-2">
          <p>From.{from}</p>
          <p className="line-clamp-2 font-light">{content}</p>
          <p className="place-self-end">To.{to}</p>
        </div>
      </LetterWrapper>
    </Link>
  );
};

export default LetterPreview;
