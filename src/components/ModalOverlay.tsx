interface ModalOverlayProps {
  children: React.ReactElement;
}

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {children}
    </div>
  );
};

export default ModalOverlay;
