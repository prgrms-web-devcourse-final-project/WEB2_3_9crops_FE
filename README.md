# 36.5 (온라인 편지 교환 플랫폼)

36.5는 사용자들이 익명으로 편지를 주고받을 수 있는 소셜 플랫폼입니다. 온라인에서 따뜻한 인간 관계를 형성하고 소통할 수 있는 공간을 제공합니다.

![Thumbnail](https://github.com/user-attachments/assets/8752a9d3-8f3d-4523-b51f-472dcbcf1b4a)
![Image](https://github.com/user-attachments/assets/328e3267-35c7-47ae-9091-850b90d07499)

- 프로젝트 기간 : 2025.02.07 ~ 2025.03.14
- 배포 URL : https://www.ddasum.kr/

## 구성원
| [한승연](https://github.com/tifsy) | [안지원](https://github.com/wldnjs990) | [김세빈](https://github.com/nirii00) | [안민하](https://github.com/AAminha) | 
| --- | --- | --- | --- | 
| <a href="https://github.com/tiffanyhansy"><img src="https://avatars.githubusercontent.com/u/125551867?v=4" width="100px;" alt=""/></a> | <a href="https://github.com/wldnjs990"><img src="https://avatars.githubusercontent.com/u/139528356?v=4" width="100px;" alt=""/></a> | <a href="https://github.com/nirii00"><img src="https://avatars.githubusercontent.com/u/108220388?v=4" width="100px;" alt=""/></a> | <a href="https://github.com/AAminha"><img src="https://avatars.githubusercontent.com/u/87255791?v=4" width="100px;" alt=""/></a> | 
| Team-Lead | Clerk  | Clerk | Clerk 
| 홈, 공유 로직, <br/> 임시저장,<br/> 퍼블리싱, <br/> 프로젝트 관리 | 편지 작성,<br/> 관리자, 알림,<br/> 퍼블리싱 <br/> 배포관리 | 디자인, 게시판,<br/> 내 편지함,<br/> 로그인, CI  | 퍼블리싱,<br/> 롤링페이퍼,<br/> 랜딩 | 

## 📋 프로젝트 개요

- **모바일 기반의 편지 웹앱 서비스**

### 핵심 기능
- **랜덤 편지 작성 및 답장**: 자신의 고민과 사연을 나누고 편지를 받거나, 랜덤한 사용자에게 답장을 보낼 수 있음
- **편지 공유 게시판**: 상대방과 나눈 편지를 허락을 받아 코멘트를 추가해 게시판에 공유 가능, 사용자들이 올린 편지를 확인하고 신고할 수 있음
- **롤링페이퍼**: 관리자가 배너에 이벤트를 게시하면, 사용자들이 해당 게시판에 들어와서 메시지를 남길 수 있음
- **편지 필터링**:
  - 관리자가 금칙어를 등록하여 편지, 공유 게시물, 롤링페이퍼 편지를 1차 필터링
  - 사용자가 편지, 롤링페이퍼, 게시물을 신고하는 경우 관리자 확인 전 AI로 1차 필터링하여 자동으로 편지를 검열함

### 개발 주안점
- **모바일 반응형과 애니메이션**:
  - 모바일 기반의 서비스로 다양한 디바이스로 QA를 진행함
  - 디바이스 별로 지원되는 애니메이션의 범위가 달라 QA를 여러번 진행
- **탄스택 쿼리를 사용하여 API 호출최적화**
  - 무한 스크롤 구현
  - 프론트엔드 캐싱 적용
- **SSE와 axios api 호출 중앙화**
  - 두가지 방식의 api 가 토큰 재발급시 충돌 -> api 중앙화

## 🛠 기술 스택

### 프론트엔드
- **언어 및 프레임워크**:  TypeScript, React, Vite
- **스타일링**: Tailwind CSS, Emotion
- **상태관리**: Zustand, Tanstack Query
- **라우팅**: Axios
- **애니메이션**: GSAP

### 품질 관리
- **Linting & Formatting**: ESLint, Prettier

### 배포
- **배포**: AWS S3 + CloudFront
- **도메인 관리**: AWS Route 53
- **CICD**: GitHub Actions

## 📂 프로젝트 구조

페이지 및 도메인 중심 구조로 설계

```
public                 // 
src
├─apis/                // API 관리
│  ├─client.ts         // axios client 설정
│  └─domain.ts         // 도메인별로 파일 분리
├─assets/              // 이미지, 폰트
│  └─icons/            // 아이콘 폴더 (주로 svg 형식)
│  │  ├─icon-icon.svg  // (kebab-case)
│  │  └─index.ts       // svg들 한번에 export
│  └─images/           // 그 외 이미지 (png, webp, jpg 등)
│  │  └─img-image.png  // (kebab-case)
├─components/          // 공통 컴포넌트
│  └─Component.tsx
├─constants/           // 공통 상수 모음
│  └─example.ts        // (내부 상수 UPPER_CASE)
├─hooks/               // 커스텀 훅
│  └─useExample.ts     // 파일명과 동일
├─layouts/             // 공통 레이아웃
│  └─Header.tsx
├─pages/               // 페이지 모음
│  ├─Home/
│  │  ├─components/    // 해당 페이지에서만 사용하는 컴포넌트
│  │  │  └─Component.tsx
│  │  ├─constants/     // 해당 페이지에서만 사용하는 상수
│  │  │  └─index.ts
│  │  └─index.tsx      // 실제 페이지 컴포넌트. 폴더명과 동일
├─stores/              // 전역 상태 관리
│  └─exampleStore.ts   // useExample (camelCase)
├─styles/              // 스타일 관련
│  ├─tailwind.css
│  └─index.css         // 여러 css 파일 모음
├─types/               // 타입 모음
│	 └─type.d.ts         // 도메인별로 파일 분리
├─utils/               // 공통으로 사용되는 함수
│	 └─utils.ts
└─.env                 // 환경변수 관리 파일 (내부 변수 UPPER_CASE)
```
