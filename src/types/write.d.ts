type Stamp = '위로와 공감' | '축하와 응원' | '고민 상담' | '기타' | null;
type Option = '편지지' | '글꼴' | '이전 편지 내용' | null;
type Step = 'edit' | 'category';
type Theme = '기본' | '축하' | '위로' | '빈티지' | '들판';

interface ThemeInfo {
  name: T_theme;
  src: string;
}
interface ThemeObj {
  기본: string;
  축하: string;
  위로: string;
  빈티지: string;
  들판: string;
}

// 이전 편지 임시 타입 지정
type PrevLetter = any[] | null;
