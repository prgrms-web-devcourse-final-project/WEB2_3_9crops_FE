import { forwardRef } from 'react';
import { useNavigate } from 'react-router';

import LetterWrapper from '@/components/LetterWrapper';
import formatDate from '@/utils/formatDate';

interface LetterPreviewProps {
  id: number;
  date: string;
  title: string;
  isSend: boolean;
  checked: boolean;
  isShareMode?: boolean;
  onToggle: () => void;
  isClosed: boolean;
  zipCode: string;
}
const LetterPreview = forwardRef<HTMLDivElement, LetterPreviewProps>((props, ref) => {
  const {
    id,
    date,
    title,
    isSend,
    checked,
    isShareMode = false,
    onToggle,
    isClosed,
    zipCode,
  } = props;
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/letter/${id}`, {
      state: {
        id,
        isClosed,
        zipCode,
      },
    });
  };

  if (isShareMode)
    return (
      <LetterWrapper isSender={isSend} ref={ref}>
        <div className="mb-3 flex items-center justify-between">
          <p className="body-r text-gray-80">{formatDate(date)}</p>
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
      </LetterWrapper>
    );

  return (
    <LetterWrapper isSender={isSend} onClick={() => handleItemClick(id)} ref={ref}>
      <p className="body-r text-gray-80 mb-3">{formatDate(date)}</p>
      <p className="body-m text-gray-80 line-clamp-1 break-all">{title}</p>
    </LetterWrapper>
  );
});

export default LetterPreview;
