function WritePageButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      className="caption-sb bg-primary-3 text-gray-60 cursor-pointer rounded-[4px] px-2 py-1"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default WritePageButton;
