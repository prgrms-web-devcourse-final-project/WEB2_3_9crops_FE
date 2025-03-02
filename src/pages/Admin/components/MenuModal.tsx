import { useEffect, useRef } from 'react';

interface ModalContents {
  title: string;
  onClick: () => void;
}
export default function MenuModal({
  modalContents,
  setModalOpen,
}: {
  modalContents: ModalContents[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!divRef.current?.contains(target)) {
        setModalOpen(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [setModalOpen]);

  return (
    <div
      ref={divRef}
      className="absolute top-10 right-5 z-40 flex flex-col gap-2.5 rounded-lg border border-[#D6D6D6] bg-[#E9E9E9] px-4 py-2.5"
    >
      {modalContents.map((content, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            content.onClick();
            setModalOpen(false);
          }}
        >
          {content.title}
        </button>
      ))}
    </div>
  );
}
