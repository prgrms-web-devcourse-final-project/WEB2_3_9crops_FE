import { GoogleIcon, KakaoIcon, NaverIcon, StampIcon } from '@/assets/icons';
import MainImg from '@/assets/images/main-item-1.png';

const LoginPage = () => {
  return (
    <>
      <main className="flex grow flex-col items-center justify-between pt-[12%]">
        <section className="relative mt-10 text-center">
          <StampIcon className="absolute -top-2 -right-0.5 -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-xl leading-[24px] font-medium tracking-[-1px]">마음이 맞닿는 온도</h2>
          <h1 className="font-malang my-2 text-5xl leading-[57.6px] text-[#F15847]">36.5</h1>
          <p className="body-sb text-gray-60">
            모르는 사람과 편지를 주고 받으며
            <br />
            마음의 위안을 얻어보세요.
          </p>
        </section>
        <div className="absolute bottom-0 z-[-20] flex w-screen justify-center overflow-hidden">
          <img
            src={MainImg}
            alt="홈 이미지 1"
            className="ml-[-65px] h-[397px] max-w-[759.5px] object-center not-visited:object-cover"
          />
        </div>
        <section className="relative flex gap-4 pb-[5%]">
          <button type="button" className="rounded-full bg-[#03C75A] p-3.5">
            <NaverIcon />
          </button>
          <button type="button" className="rounded-full bg-[#FEE500] p-3.5">
            <KakaoIcon />
          </button>
          <button type="button" className="border-gray-5 rounded-full border bg-white p-3.5">
            <GoogleIcon />
          </button>
        </section>
      </main>
      <div className="absolute bottom-[-1px] left-1/2 z-[-10] h-50 w-screen -translate-x-1/2 bg-[url('/src/assets/images/landing-blur.png')] object-fill" />
    </>
  );
};

export default LoginPage;
