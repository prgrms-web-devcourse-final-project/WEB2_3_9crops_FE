import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';

import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import { useNavigate } from 'react-router';
import useNotificationStore from '@/stores/notification';

export const useServerSentEvents = () => {
  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const sourceRef = useRef<EventSourcePolyfill | null>(null);

  const setToastActive = useToastStore((state) => state.setToastActive);

  const addNotReadCount = useNotificationStore((state) => state.addNotReadCount);

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
          console.log('알림 수신');
          addNotReadCount();

          setToastActive({
            toastType: 'Info',
            title: '새 알림이 도착했어요!',
            position: 'Top',
            time: 5,
            onClick: () => navigate('/mypage/notifications'),
          });
        };

        sourceRef.current.onerror = (error) => {
          console.log(error);
          console.log('에러 발생함');
          addNotReadCount();

          closeSSE();
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

  const closeSSE = () => {
    sourceRef.current?.close();
    sourceRef.current = null;
  };

  // return { closeSSE };
};
