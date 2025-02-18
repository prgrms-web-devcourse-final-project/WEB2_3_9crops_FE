import { Link } from 'react-router';

import MemoBg from '@/assets/images/letter-pink.png';

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
        className="caption-r flex flex-col gap-2 rounded-sm bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center px-3 py-2"
        style={{ '--bg-image': `url(${MemoBg})` } as React.CSSProperties}
      >
        <p>From.{from}</p>
        <p className="line-clamp-2 font-light">{content}</p>
        <p className="place-self-end">To.{to}</p>
      </article>
    </Link>
  );
};

export default LetterPreview;
