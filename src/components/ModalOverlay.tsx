interface ModalOverlayProps {
  closeOnOutsideClick?: boolean;
  children: React.ReactElement;
  onClose?: () => void;
}

const ModalOverlay = ({ closeOnOutsideClick = false, children, onClose }: ModalOverlayProps) => {
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
