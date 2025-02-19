import { useState } from 'react';
import MatchingSelect from './MatchingSelect';
import MatchingSelectModal from './MatchingSelectModal';
import Matched from './Matched';
import BgItem from '@/assets/images/field-4.png';
import LetterDetail from '@/components/LetterDetail';

const RandomLettersPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<SelectedLetter>({
    stampName: '기타',
    title: 'error',
  });

  const DUMMY = {
    title: '나에게 햄버거 햄부기우기우가 햄북스따스 함부르크 햄버거링고를 대령하거라 ',
    text: '이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. ',
  };

  return (
    <>
      {false && (
        <div className="flex grow flex-col items-center overflow-hidden">
          <span className="text-gray-60 body-b mt-20 rounded-full bg-white px-6 py-4">
            답장하고 싶은 편지를 선택해주세요!
          </span>
          <MatchingSelect setOpenModal={setOpenModal} setSelectedLetter={setSelectedLetter} />
          {/* <Matched /> */}
          <div
            className="fixed bottom-[-40px] left-1/2 z-[-10] h-42 w-full -translate-x-1/2 bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center opacity-70"
            style={{ '--bg-image': `url(${BgItem})` } as React.CSSProperties}
          />
          {openModal && (
            <MatchingSelectModal setOpenModal={setOpenModal} selectedLetter={selectedLetter} />
          )}
        </div>
      )}
      <LetterDetail title={DUMMY.title} text={DUMMY.text}></LetterDetail>
    </>
  );
};

export default RandomLettersPage;
