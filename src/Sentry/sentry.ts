import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://29d2c788d61a2d1e6647da9f16c01def@o4509101248413697.ingest.us.sentry.io/4509101251100672',
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  // tracePropagationTargets: ["localhost", '백엔드 도메인 주소']
  // tracePropagationTargets는 프론트엔드와 백엔드의 퍼포먼스 추적을 연결할때 사용하는 속성으로 백엔드도 Sentry를 사용해야 서로 연결 가능하다.
});
