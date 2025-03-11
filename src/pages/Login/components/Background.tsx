import { Link } from 'react-router';

import FieldImg from '@/assets/images/home-left-mountain.webp';
import FieldImgDark from '@/assets/images/home-left-mountain-dark.webp';

import BlurImg from '@/assets/images/landing-blur.png';
import EnvelopeImg from '@/assets/images/postoffice-letter.png';
import PostofficeImg from '@/assets/images/postoffice.png';
import BackgroundImageWrapper from '@/components/BackgroundImageWrapper';
import useThemeStore from '@/stores/themeStore';

const Background = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <div className="fixed -bottom-8 z-0 flex justify-center overflow-hidden">
        <div className="relative flex h-[440px] min-w-[759.5px] items-end justify-center">
          <Link to="/landing">
            <div className="animate-login-move-up-down absolute bottom-[313px] left-1/2 z-1 -translate-x-1/2">
              <p className="text-gray-60 body-r -rotate-[5.28deg] pr-1 text-center dark:text-white">
                36.5 설명 보기
              </p>
              <img
                src={EnvelopeImg}
                alt="편지 이미지"
                className="h-[90px] w-full object-contain object-center"
              />
            </div>
          </Link>
          <img
            src={PostofficeImg}
            alt="우체국 이미지"
            className="absolute bottom-[93px] left-1/2 z-1 h-[184.5px] w-full -translate-x-1/2 object-contain object-[calc(50%-78px)]"
          />
          <img
            src={theme === 'light' ? FieldImg : FieldImgDark}
            alt="언덕 이미지"
            className="z-0 h-[205px] w-full object-cover object-[calc(50%-26px)]"
          />
        </div>
      </div>
      <BackgroundImageWrapper
        className="fixed bottom-[-1px] left-1/2 z-0 h-50 w-screen -translate-x-1/2 object-fill"
        imageUrl={BlurImg}
      />
    </>
  );
};

export default Background;
