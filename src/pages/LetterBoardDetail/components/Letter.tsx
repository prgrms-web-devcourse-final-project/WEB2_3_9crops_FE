import MemoWrapper from '@/components/MemoWrapper';

interface LetterProps {
  letter: {
    receiverZipCode: string;
    content: string;
    writerZipCode: string;
  };
  isWriter?: boolean;
}

const Letter = ({ letter, isWriter = false }: LetterProps) => {
  return (
    <MemoWrapper isSender={isWriter}>
      <div className="flex flex-col gap-2 text-black">
        <p className="body-sb">To. {letter.receiverZipCode}</p>
        <p className="body-r leading-[26px] break-all whitespace-pre-wrap">{letter.content}</p>
        <p className="body-m place-self-end">From. {letter.writerZipCode}</p>
      </div>
    </MemoWrapper>
  );
};

export default Letter;
