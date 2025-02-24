import { useNavigate } from 'react-router';

import { ArrowLeftIcon } from '@/assets/icons';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} aria-label="뒤로 가기">
      <ArrowLeftIcon className="text-primary-1 h-6 w-6" />
    </button>
  );
}
