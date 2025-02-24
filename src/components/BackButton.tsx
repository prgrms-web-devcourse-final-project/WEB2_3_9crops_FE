import { ArrowLeftIcon } from '@/assets/icons';

export default function BackButton() {
  return (
    <button onClick={() => window.history.back()}>
      <ArrowLeftIcon className="text-primary-1 h-6 w-6" />
    </button>
  );
}
