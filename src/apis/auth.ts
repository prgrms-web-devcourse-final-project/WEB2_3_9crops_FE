// import useAuthStore from '@/stores/authStore';

// import client from './client';

type LoginType = 'kakao' | 'naver' | 'google';
export const socialLogin = (loginType: LoginType) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { setUserId, setZipCode, login } = useAuthStore.getState();
    window.location.href = `http://13.209.132.150:8081/oauth2/authorization/${loginType}`;
};

