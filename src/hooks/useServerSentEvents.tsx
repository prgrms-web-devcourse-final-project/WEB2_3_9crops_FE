import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';

import useAuthStore from '@/stores/authStore';

export const useServerSentEvents = () => {
  const accessToken = useAuthStore.getState().accessToken;
  const sourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    if (!accessToken) {
      console.log('로그인 정보 확인불가');
      return;
    }

    const connectSSE = () => {
      try {
        console.log('구독 시작');
        sourceRef.current = new EventSourcePolyfill(
          `${import.meta.env.VITE_API_URL}/api/notifications/sub`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        sourceRef.current.onmessage = (event) => {
          console.log(event);
          console.log('알림 전송');
        };

        sourceRef.current.onerror = (error) => {
          console.log(error);
          console.log('에러 발생함');
          sourceRef.current?.close();
          // 재연결 로직 추가 가능
          setTimeout(connectSSE, 5000); // 5초 후 재연결 시도
        };
      } catch (error) {
        console.error(error);
      }
    };

    connectSSE();

    return () => {
      console.log('컴포넌트 언마운트로 인한 구독해제');
      closeSSE();
    };
  }, [accessToken]);

  // 바깥으로 보낼 closeSSE 함수
  const closeSSE = () => {
    sourceRef.current?.close();
    sourceRef.current = null;
  };

  return { closeSSE };
};
