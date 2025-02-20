import { Link } from 'react-router';

import PinkLetterBg from '@/assets/images/letter-pink.png';

interface LetterPreviewProps {
  id: string;
  to: string;
  from: string;
  content: string;
}

const LetterPreview = ({ id, to, from, content }: LetterPreviewProps) => {
  return (
    <Link to={id}>
      <article
        className="caption-r background-image-filled flex flex-col gap-2 rounded-sm px-3 py-2"
        style={{ '--bg-image': `url(${PinkLetterBg})` } as React.CSSProperties}
      >
        <p>From.{from}</p>
        <p className="line-clamp-2 font-light">{content}</p>
        <p className="place-self-end">To.{to}</p>
      </article>
    </Link>
  );
};

export default LetterPreview;
