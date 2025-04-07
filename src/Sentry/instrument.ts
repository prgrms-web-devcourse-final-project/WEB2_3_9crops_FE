import useAuthStore from '@/stores/authStore';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://29d2c788d61a2d1e6647da9f16c01def@o4509101248413697.ingest.us.sentry.io/4509101251100672',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      // 모든 텍스트, input 마스킹을 뺄 수 있지만 보안상으로 위험할 수 있으니 특정 클래스나 속성이 있는 요소에 마스킹을 걸 수 있는 mask 속성을 같이 활용하자!
      // 제일 베스트는 전체를 마스킹 처리 하고 보여줄 몇몇 공간만 unmask속성으로 클래스를 따로 지정해줘 마스킹을 풀어주는게 베스트!
      maskAllText: false,
      maskAllInputs: false,

      // mask 속성으로 마스킹 할 부분에만 클래스 부여해서 마스킹 하기(아래 코드처럼 input에 type이 password인 경우만 마스킹 걸 수도 있음)
      mask: ['.secret', 'input[type="password"]'],
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  // tracePropagationTargets: ["localhost", '백엔드 도메인 주소']
  // tracePropagationTargets는 프론트엔드와 백엔드의 퍼포먼스 추적을 연결할때 사용하는 속성으로 백엔드도 Sentry를 사용해야 서로 연결 가능하다.
});

// 오류가 발생한 유저의 username(36.5에선 zipcode가 닉네임임), email 등을 추가해서 사이트에서 오류 필터링이 가능하다.
// 이외에도 id 등의 필터링 속성이 있지만 현재 백엔드 로직상 로그인시에 유저 id에 대한 정보를 안 받아오기 때문에 추가를 못한다... 나중에 요청 드려봐야할듯

Sentry.setUser({
  username: useAuthStore.getState().zipCode,
  email: useAuthStore.getState().email,
});

export default Sentry;
