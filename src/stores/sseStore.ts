import { EventSourcePolyfill } from 'event-source-polyfill';
import { create } from 'zustand';

import useAuthStore from '@/stores/authStore'; // 액세스 토큰을 가져올 Zustand 스토어

interface SSEState {
  messages: string[];
  connectSSE: () => void;
  closeSSE: () => void;
}

export const useSSEStore = create<SSEState>((set, get) => {
  let source: EventSourcePolyfill | null = null; // SSE 인스턴스 저장

  return {
    messages: [],

    connectSSE: () => {
      const accessToken = useAuthStore.getState().accessToken; // authStore에서 변수 가져오기
      if (!accessToken) {
        console.log('엑세스 토큰이 존재하지 않습니다. 구독 불가');
        return;
      }

      console.log('🟢 SSE 구독 시작');

      // 기존 SSE 연결 종료
      get().closeSSE();

      // 새로운 SSE 연결 생성
      source = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}/api/notifications/sub`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      source.onmessage = (event) => {
        console.log('SSE 메시지 수신:', event.data);
        set((state) => ({ messages: [...state.messages, event.data] })); // 메시지 전역 저장
      };

      source.onerror = (error) => {
        console.log('SSE 오류 발생:', error);
        get().closeSSE();
        setTimeout(() => get().connectSSE(), 5000); // 5초 후 재연결
      };
    },

    // 🔥 SSE 종료 함수 (로그아웃 시 실행)
    closeSSE: () => {
      console.log('SSE 수동 종료');
      source?.close();
      source = null;
      set({ messages: [] }); // 상태 초기화
    },
  };
});
