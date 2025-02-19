import { useEffect } from 'react';

import { getScrollbarWidth } from '@/utils/getScrollbarWidth';

interface ModalOverlayProps {
  closeOnOutsideClick?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalOverlay = ({ closeOnOutsideClick = false, children, onClose }: ModalOverlayProps) => {
  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    const header = document.querySelector('header');

    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.body.classList.add('modal-open');
    if (header) header.classList.add('modal-open');

    return () => {
      document.documentElement.style.setProperty('--scrollbar-width', '0px');
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleClickOutside = () => {
    if (closeOnOutsideClick && onClose) {
      onClose();
    }
  };

  const handleClickInside = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClickOutside}
    >
      <div className="flex flex-col" onClick={handleClickInside}>
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
