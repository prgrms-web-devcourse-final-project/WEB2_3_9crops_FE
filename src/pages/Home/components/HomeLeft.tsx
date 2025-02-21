import RandomCheer from './RandomCheer';
import GoToWrite from './GoToWrite';
import GoToRandomLetter from './GoToRandomLetter';

const HomeLeft = () => {
  return (
    <div
      style={{ top: 'calc(-240px + var(--vh) * 64)' }}
      className="absolute flex w-full max-w-150 min-w-[300px] flex-shrink-0 grow snap-start flex-col space-y-[calc(var(--vh)*2)]"
    >
      <RandomCheer />
      <GoToWrite />
      <GoToRandomLetter />
    </div>
  );
};

export default HomeLeft;
