import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';

import useAuthStore from '@/stores/authStore';

export const useServerSentEvents = () => {
  const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    if (!accessToken) return console.log('구독 연결 실패');

    let source: EventSourcePolyfill | null = null;

    const connectSSE = () => {
      try {
        console.log('구독 시작');
        source = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}/api/notifications/sub`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        source.onmessage = (payload) => {
          console.log(payload);
          console.log('알림 전송');
        };

        source.addEventListener('notification', (event) => {
          console.log(event);
          console.log('알림 전송 dd');
        });

        source.onerror = (error) => {
          console.log(error);
          console.log('에러 발생함');
          source?.close();
          // 재연결 로직 추가 가능
          setTimeout(connectSSE, 5000); // 5초 후 재연결 시도
        };
      } catch (error) {
        console.error(error);
      }
    };

    connectSSE();

    return () => {
      source?.close();
    };
  }, [accessToken]);
};
