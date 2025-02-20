interface ModalOverlayProps {
  children: React.ReactElement;
  onClick?: () => void;
}

const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
