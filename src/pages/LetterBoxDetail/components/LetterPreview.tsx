import { Link } from 'react-router';

import ListItemWrapper from '@/components/ListItemWrapper';

interface LetterPreviewProps {
  id: number;
  date: string;
  title: string;
  isSend: boolean;
  checked: boolean;
  isShareMode?: boolean;
  onToggle: () => void;
}
const LetterPreview = ({
  id,
  date,
  title,
  isSend,
  checked,
  isShareMode = false,
  onToggle,
}: LetterPreviewProps) => {
  if (isShareMode)
    return (
      <ListItemWrapper isSender={isSend}>
        <div className="mb-3 flex items-center justify-between">
          <p className="body-r text-gray-80">{date}</p>
          <label htmlFor={`${id}`} className="relative">
            <input
              id={`${id}`}
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={onToggle}
            />
            <div className="peer-checked:bg-primary-1 h-5 w-5 rounded-sm border-3 border-white bg-white" />
          </label>
        </div>
        <p className="body-m text-gray-80 line-clamp-1 break-all">{title}</p>
      </ListItemWrapper>
    );

  return (
    <Link to={`/letter/${id}`}>
      <ListItemWrapper isSender={isSend}>
        <p className="body-r text-gray-80 mb-3">{date}</p>
        <p className="body-m text-gray-80 line-clamp-1 break-all">{title}</p>
      </ListItemWrapper>
    </Link>
  );
};

export default LetterPreview;
