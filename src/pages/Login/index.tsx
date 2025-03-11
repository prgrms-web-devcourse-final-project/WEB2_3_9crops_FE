import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { socialLogin } from '@/apis/auth';
import { GoogleIcon, KakaoIcon, NaverIcon, StampIcon } from '@/assets/icons';
import useAuthStore from '@/stores/authStore';

import Background from './components/Background';

const LoginPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleLogin = (loginType: LoginType) => {
    socialLogin(loginType);
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  return (
    <>
      <main className="mt-10 flex grow flex-col items-center justify-between">
        <section className="relative mt-10 text-center">
          <StampIcon className="absolute -top-2 -right-0.5 -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-xl leading-[24px] font-medium tracking-[-1px] dark:text-white">
            마음이 맞닿는 온도
          </h2>
          <h1 className="font-malang dark:text-primary-3 my-2 text-5xl leading-[57.6px] text-[#F15847]">
            36.5
          </h1>
          <p className="body-sb text-gray-60 dark:text-white">
            모르는 사람과 편지를 주고 받으며
            <br />
            마음의 위안을 얻어보세요.
          </p>
        </section>
        <Background />
        <section className="relative flex gap-4 pb-[4%]">
          <button
            type="button"
            className="rounded-full bg-[#03C75A] p-3.5"
            aria-label="네이버 로그인"
            onClick={() => handleLogin('naver')}
          >
            <NaverIcon />
          </button>
          <button
            type="button"
            className="rounded-full bg-[#FEE500] p-3.5"
            aria-label="카카오 로그인"
            onClick={() => handleLogin('kakao')}
          >
            <KakaoIcon />
          </button>
          <button
            type="button"
            className="border-gray-5 rounded-full border bg-white p-3.5"
            aria-label="구글 로그인"
            onClick={() => handleLogin('google')}
          >
            <GoogleIcon />
          </button>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
