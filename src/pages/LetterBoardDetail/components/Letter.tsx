import MemoWrapper from '@/components/MemoWrapper';

interface LetterProps {
  letter: {
    receiver: string;
    content: string;
    sender: string;
  };
  isSender?: boolean;
}

const Letter = ({ letter, isSender = false }: LetterProps) => {
  return (
    <MemoWrapper isSender={isSender}>
      <div className="flex flex-col gap-2 text-black">
        <p className="body-sb">To. {letter.receiver}</p>
        <p className="body-r leading-[26px] whitespace-pre-wrap">{letter.content}</p>
        <p className="body-m place-self-end">From. {letter.sender}</p>
      </div>
    </MemoWrapper>
  );
};

export default Letter;
