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
  category: Category;
  memberId: number;
  matchingId: number | null;
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
  receiverId: number | null;
  parentLetterId: number | null;
  title: string;
  content: string;
  category: Category;
  paperType: PaperType;
  fontType: FontType;
  matchingId: number | null;
}

interface TemporaryRequest extends LetterRequest {
  letterId: number | null;
}

interface FirstReplyRequest {
  receiverId: number | null;
  parentLetterId: number | null;
  title: string;
  content: string;
  category: Category;
  paperType: PaperType;
  fontType: FontType;
}
