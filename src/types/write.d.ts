type Category = 'CONSOLATION' | 'CELEBRATION' | 'CONSULT' | 'ETC' | '답변자';
type Option = '편지지' | '글꼴' | '이전 편지 내용' | null;
type Step = 'edit' | 'category';
type PaperType = 'BASIC' | 'CELEBRATE' | 'COMFORT' | 'PAPER' | 'FIELD';
type FontType = 'KYOBO' | 'GYEONGGI' | 'HIMCHAN' | 'DEFAULT';

interface PaperTypeObj {
  BASIC: string;
  CELEBRATE: string;
  COMFORT: string;
  PAPER: string;
  FIELD: string;
}

interface Fonts {
  fontType: FontType;
  fontName: string;
  fontFamily: string;
}

interface PrevLetter {
  letterId: number;
  title: string;
  content: string;
  paperType: PaperType;
  fontType: FontType;
}

interface Categorys {
  CONSOLATION: string;
  CELEBRATION: string;
  CONSULT: string;
  ETC: string;
  답변자: string;
}

interface CategoryList {
  paperType: PaperType;
  name: string;
  src: string;
}

interface CategoryStamps {
  category: Category;
  title: string;
  image: string;
}

// API 타입
interface LetterRequest {
  receiver: number | null;
  parentLetterId: number | null;
  title: string;
  content: string;
  category: Category;
  paperType: PaperType;
  fontType: FontType;
}

// 기존 설정 타입들
// type Stamp = '위로와 공감' | '축하와 응원' | '고민 상담' | '기타' | '답변자';
// type Option = '편지지' | '글꼴' | '이전 편지 내용' | null;
// type Step = 'edit' | 'category';
// type Theme = '기본' | '축하' | '위로' | '빈티지' | '들판';
