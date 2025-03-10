import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';

import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import { useNavigate } from 'react-router';
import useNotificationStore from '@/stores/notificationStore';
import { getNewToken } from '@/apis/auth';

interface MessageEventData {
  title: string;
  alarmType: AlarmType;
}

export const useServerSentEvents = () => {
  let reconnect: number | undefined;

  const navigate = useNavigate();
  // const recallCountRef = useRef(1);

  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const sourceRef = useRef<EventSourcePolyfill | null>(null);

  const setToastActive = useToastStore((state) => state.setToastActive);

  const incrementNotReadCount = useNotificationStore((state) => state.incrementNotReadCount);

  const ALARM_TYPE: AlarmType[] = ['SENDING', 'LETTER', 'REPORT', 'SHARE', 'POSTED'];
  const handleOnMessage = async (data: string) => {
    const message: MessageEventData = await JSON.parse(data);
    if (ALARM_TYPE.includes(message.alarmType)) {
      incrementNotReadCount();
      setToastActive({
        toastType: 'Info',
        title: message.title,
        position: 'Top',
        time: 5,
        onClick: () => navigate('/mypage/notifications'),
      });
    }
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
          // console.log(event);
          // console.log('알림 수신');
          handleOnMessage(event.data);
        };

        sourceRef.current.onerror = (event) => {
          console.log(event);
          const errorEvent = event as unknown as { status?: number };
          if (errorEvent.status === 401) {
            console.log('401로 인한 리이슈 작업 실행');
            callReissue();
            closeSSE();
            reconnect = setTimeout(connectSSE, 5000);
          } else {
            closeSSE();
            reconnect = setTimeout(connectSSE, 5000);
          }
        };
      } catch (error) {
        console.log('catch문에서 에러 발생', error);
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
