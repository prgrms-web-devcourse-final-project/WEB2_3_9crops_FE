import PinkMemoBg from '@/assets/images/memo-pink.png';
import YellowMemoBg from '@/assets/images/memo-yellow.png';

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
    <article
      className="background-image-filled flex flex-col gap-2 p-4 text-black"
      style={
        { '--bg-image': `url(${isSender ? PinkMemoBg : YellowMemoBg})` } as React.CSSProperties
      }
    >
      <p className="body-sb">To. {letter.receiver}</p>
      <p className="body-r leading-[26px] whitespace-pre-wrap">{letter.content}</p>
      <p className="body-m place-self-end">From. {letter.sender}</p>
    </article>
  );
};

export default Letter;
