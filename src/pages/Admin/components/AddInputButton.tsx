import { useEffect, useRef } from 'react';

import { AddIcon } from '@/assets/icons';

export default function AddInputButton({
  setAddInputShow,
}: {
  setAddInputShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputWidth = (event: Event) => {
    const target = event.target as HTMLInputElement;
    target.style.width = '50px';
    target.style.width = `${target.scrollWidth}px`;
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('input', handleInputWidth);
      inputElement.focus();
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', handleInputWidth);
      }
    };
  }, []);

  return (
    <span className="flex items-center gap-1.5 rounded-2xl bg-[#C1C1C1] px-4 py-1.5">
      <input
        ref={inputRef}
        type="text"
        className="w-10 min-w-10"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setAddInputShow(false);
          }
        }}
      />
      <button
        onClick={() => {
          setAddInputShow(false);
        }}
      >
        <AddIcon className="h-4 w-4" />
      </button>
    </span>
  );
}
