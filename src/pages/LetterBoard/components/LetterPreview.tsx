import { Link } from 'react-router';

import PinkLetterBg from '@/assets/images/letter-pink.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';

interface LetterPreviewProps {
  id: string;
  to: string;
  from: string;
  content: string;
}

const LetterPreview = ({ id, to, from, content }: LetterPreviewProps) => {
  return (
    <Link to={id}>
      <BackgroundImageWrapper
        as="article"
        className="caption-r flex flex-col gap-2 rounded-sm px-3 py-2"
        imageUrl={PinkLetterBg}
      >
        <p>From.{from}</p>
        <p className="line-clamp-2 font-light">{content}</p>
        <p className="place-self-end">To.{to}</p>
      </BackgroundImageWrapper>
    </Link>
  );
};

export default LetterPreview;
