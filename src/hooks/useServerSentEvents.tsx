import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';

import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import { useNavigate } from 'react-router';
import useNotificationStore from '@/stores/notificationStore';
import { getNewToken } from '@/apis/auth';

interface MessageEventData {
  title: string;
  alarmType: AlarmType | 'TEST';
}

export const useServerSentEvents = () => {
  let reconnect: number | undefined;

  const navigate = useNavigate();

  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const sourceRef = useRef<EventSourcePolyfill | null>(null);

  const setToastActive = useToastStore((state) => state.setToastActive);

  const incrementNotReadCount = useNotificationStore((state) => state.incrementNotReadCount);

  const handleOnMessage = async (event: MessageEvent) => {
    const data: MessageEventData = await JSON.parse(event.data);
    if (data.alarmType === 'TEST') return;
    incrementNotReadCount();
    setToastActive({
      toastType: 'Info',
      title: data.title,
      position: 'Top',
      time: 5,
      onClick: () => navigate('/mypage/notifications'),
    });
  };

  // 토큰 재발급 함수
  const callReissue = async () => {
    try {
      const response = await getNewToken();
      if (response?.status !== 200) throw new Error('error while fetching newToken');
      const newToken = response?.data.data.accessToken;
      return setAccessToken(newToken);
    } catch (e) {
      return Promise.reject(e);
    }
  };

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
          handleOnMessage(event); // 나중에 코드 수정해야함
        };

        sourceRef.current.onerror = (error) => {
          callReissue();
          console.log(error);
          console.log('에러 발생함');

          closeSSE();
          // 재연결 로직 추가 가능
          reconnect = setTimeout(connectSSE, 5000);
        };
      } catch (error) {
        console.log('에러', error);
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
    if (reconnect) clearTimeout(reconnect);
    sourceRef.current?.close();
    sourceRef.current = null;
  };

  // return { closeSSE };
};
