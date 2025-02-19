import { useEffect, useState } from 'react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';

import 'swiper/swiper-bundle.css';

import { restartIcon } from '@/assets/icons';
import ResultLetter from '@/components/ResultLetter';

export default function MatchingSelect({
  setOpenModal,
  setSelectedLetter,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLetter: React.Dispatch<React.SetStateAction<SelectedLetter>>;
}) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const CATEGORY_LIST = ['전체', '위로와 공감', '축하와 응원', '고민 상담', '기타'];
  const DUMMY_LIST: { stampName: Stamp; title: string }[] = [
    { stampName: '위로와 공감', title: '위로가 필요해요' },
    { stampName: '축하와 응원', title: '저에게 미움받을 용기를 주세요' },
    { stampName: '고민 상담', title: '삶이 무료해서 고민이에요' },
    { stampName: '기타', title: '어제 꾼 꿈이 신기했어요' },
    { stampName: '고민 상담', title: '삶이 유료해서 고민이에요' },
    { stampName: '축하와 응원', title: '어제 취업했어요!!!!' },
    { stampName: '축하와 응원', title: '어제 게임 신기록 세웠어요!!!!!' },
    { stampName: '기타', title: '기타는 핑거스타일이 멋있는거 같아요' },
    { stampName: '위로와 공감', title: '10년지기 친구가 이사를 가요' },
    {
      stampName: '기타',
      title:
        '햄부기햄북 햄북어 햄북스딱스 함부르크햄부가우가 햄비기햄부거 햄부가티햄부기온앤 온 을 차려오거라.',
    },
  ];

  return (
    <>
      <div className="mt-25 flex flex-col items-start justify-center">
        <button className="flex gap-1">
          <img src={restartIcon} alt="재시작 아이콘" />
          <span className="caption-sb text-gray-30" onClick={() => {}}>
            리스트 새로고침
          </span>
        </button>
        <div className="w-full max-w-[300px]">
          <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
            {DUMMY_LIST.map((list, idx) => {
              return (
                <SwiperSlide key={idx} className="max-w-full">
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedLetter(() => ({ stampName: list.stampName, title: list.title }));
                    }}
                  >
                    <ResultLetter stampName={list.stampName} title={list.title} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="mt-11 flex w-60 flex-wrap items-center justify-center gap-2">
        {CATEGORY_LIST.map((category, idx) => {
          return (
            <button
              onClick={() => {
                setSelectedCategory(category);
              }}
              className={twMerge(
                `body-b text-gray-60 rounded-full bg-white px-3 py-1.5`,
                selectedCategory === category && 'bg-primary-1 text-white',
              )}
              key={idx}
            >
              {category}
            </button>
          );
        })}
      </div>
    </>
  );
}
