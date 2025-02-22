import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { getLetter } from '@/apis/letterDetail';
import { CloudIcon, SirenOutlinedIcon, SnowIcon, ThermostatIcon, WarmIcon } from '@/assets/icons';
import ReportModal from '@/components/ReportModal';

const LetterDetailPage = () => {
  const params = useParams();
  // 일단 api 받아왔는데 목 데이터의 enum이 잘못 설정되어있어서 데이터 바인딩이 안됨 -> 진영님이 수정해주시면 그때 바인딩 해보기!
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null);

  const DUMMY = {
    title: '나에게 햄버거 햄부기우기우가 햄북스따스 함부르크 햄버거링고를 대령하거라 ',
    text: '이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. ',
  };
  const FONT = 'kobyo';
  const THEME = 'celebrate';
  const DEGREES = [
    { icon: <WarmIcon className="h-5 w-5" />, title: '따뜻해요' },
    { icon: <CloudIcon className="h-5 w-5" />, title: '그럭저럭' },
    { icon: <SnowIcon className="h-5 w-5" />, title: '앗! 차가워' },
  ];
  const [degreeModalOpen, setDegreeModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  const degreeButtonRef = useRef<HTMLButtonElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target || degreeButtonRef.current?.contains(target)) {
      return;
    }
    setDegreeModalOpen(false);
  };
  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    if (params.id) {
      getLetter(params.id, setLetterDetail);
    }

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [params.id]);
  return (
    <>
      {reportModalOpen && <ReportModal onClose={() => setReportModalOpen(false)} />}
      <div className={twMerge(`flex grow flex-col gap-3 px-5 pb-7.5`, THEME)}>
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            ref={degreeButtonRef}
            className="flex items-center justify-center gap-1"
            onClick={() => {
              setDegreeModalOpen((cur) => !cur);
            }}
          >
            <ThermostatIcon className="h-6 w-6" />
            <span className="caption-b text-primary-1">편지 온도</span>
          </button>
          <button
            onClick={() => {
              setReportModalOpen(true);
            }}
          >
            <SirenOutlinedIcon className="text-primary-1 h-6 w-6" />
          </button>
          {degreeModalOpen && (
            <div className="caption-b text-primary-1 bg-primary-5 absolute top-7 z-40 flex flex-col gap-1 p-2 shadow">
              {DEGREES.map((degree, idx) => {
                return (
                  <button
                    key={idx}
                    className="flex items-center justify-start gap-1"
                    onClick={() => {
                      console.log(idx);
                    }}
                  >
                    {degree.icon}
                    {degree.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 px-5">
          <span className="body-b mt-[55px]">TO. 따숨이</span>
          <span className="body-sb">{DUMMY.title}</span>
        </div>
        <textarea
          readOnly
          value={DUMMY.text}
          className={twMerge(`body-r basic-theme min-h-full w-full grow px-6`, `${FONT}`)}
        ></textarea>
        <span className="body-sb mt-10 flex justify-end">FROM. {'12E12'}</span>
        <button className="bg-primary-3 body-m mt-3 w-full rounded-lg py-2">편지 작성하기</button>
      </div>
    </>
  );
};

export default LetterDetailPage;
