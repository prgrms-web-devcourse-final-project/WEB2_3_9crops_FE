export type T_stamp = '위로와 공감' | '축하와 응원' | '고민 상담' | '기타' | null;
export type T_option = '편지지' | '글꼴' | '이전 편지 내용' | null;
export type T_step = 'edit' | 'category';
export type T_theme = '기본' | '축하' | '위로' | '빈티지' | '들판';

export interface T_theme_info {
  name: T_theme;
  src: string;
}
export interface T_theme_obj {
  기본: string;
  축하: string;
  위로: string;
  빈티지: string;
  들판: string;
}

// 이전 편지 임시 타입 지정
export type T_prev_letter = any[] | null;
