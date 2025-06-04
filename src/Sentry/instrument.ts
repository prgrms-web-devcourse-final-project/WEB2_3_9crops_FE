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

  // 아래 옵션은 사용자에게 발생하는 오류에 대해 모니터링 서비스를 선택하는 코드들임
  // 0~1의 수치는 사용자 발생 오류의 몇 %를 저장할것인지 정하는 값
  // 0.1당 10%임
  // 0.1이니깐 사용자 100명중 10명의 오류 세션을 저장하는 형태()
  tracesSampleRate: 0.1,
  // tracesSampleRate는 사용자가 이용하는 서비스의 성능을 기록하는 속성
  replaysOnErrorSampleRate: 0.1,
  // replaysOnErrorSampleRate는 세션을 버퍼라는 휘발성 메모리 공간에 보관해두다가 오류가 발생한 시점에 세션만 저장하는 속성

  // replaysSessionSampleRate: 0.1,
  // replaysSessionSampleRate는 사용자의 서비스 이용 처음부터 끝까지 모든 세션을 저장해두는 속성
  // 오류가 없어도 서비스 이용 사항을 세부적으로 추적 가능하지만 비용이 어마무시해서(0.1이 에러샘플녹화 1보다 더 많이 듬) 실배포에선 돈 진짜 많으면 켜두자

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
