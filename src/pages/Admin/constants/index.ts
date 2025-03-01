export const ADMIN_MENU_LIST = [
  { title: '대시보드', path: undefined },
  { title: '사용자 목록', path: undefined },
  {
    title: '게시판 관리',
    subMenu: [
      {
        title: '공개 편지 설정',
        path: undefined,
      },
      {
        title: '롤링 페이퍼 설정',
        path: undefined,
      },
    ],
  },
  {
    title: '검열 관리',
    subMenu: [
      {
        title: '신고 편지 목록',
        path: '/admin/report',
      },
      {
        title: '필터링 단어 설정',
        path: '/admin/badwords',
      },
      {
        title: '차단된 편지 목록',
        path: '/admin/filtered-letter',
      },
    ],
  },
];
