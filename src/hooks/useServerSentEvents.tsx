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
  const recallCountRef = useRef(1);

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
          console.log(event);
          console.log('알림 수신');
          handleOnMessage(event.data);
        };

        sourceRef.current.onerror = () => {
          // 에러 발생시 해당 에러가 45초를 넘어서 발생한 에러인지, 401에러인지 판단할 수 있는게 없어서 그냥 에러 발생하면 reissue 넣는걸로 때움
          callReissue();
          closeSSE();
          recallCountRef.current += 1;
          console.log(recallCountRef.current);

          // 재연결 로직 추가 가능
          if (recallCountRef.current < 5) {
            reconnect = setTimeout(connectSSE, 5000);
          } else {
            console.log('5회 이상 에러발생으로 구독기능 제거');
          }
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
