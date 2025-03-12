import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';

import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import { useNavigate } from 'react-router';
import useNotificationStore from '@/stores/notificationStore';

interface MessageEventData {
  title: string;
  alarmType: AlarmType;
}

export const useServerSentEvents = () => {
  let reconnect: number | undefined;

  const navigate = useNavigate();
  // const recallCountRef = useRef(1);

  const accessToken = useAuthStore((state) => state.accessToken);
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

  useEffect(() => {
    if (!accessToken) {
      // console.log('로그인 정보 확인불가');
      return;
    }

    const connectSSE = () => {
      const accessToken = useAuthStore.getState().accessToken;

      try {
        // console.log('구독 시작');
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

        sourceRef.current.onerror = async (event) => {
          console.log(event);
          const errorEvent = event as unknown as { status?: number };
          if (errorEvent.status === 401) {
            try {
              await useAuthStore.getState().refreshToken();
            } catch (error) {
              console.log('다른 api에서 리프레시 토큰 호출중입니다.');
            }
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
      // console.log('컴포넌트 언마운트로 인한 구독해제');
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
