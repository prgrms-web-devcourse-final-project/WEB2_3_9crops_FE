import basicTheme from '@/assets/images/basic-theme.webp';
import celebrationStamp from '@/assets/images/celebration-stamp.webp';
import celebration from '@/assets/images/celebration.webp';
import congratTheme from '@/assets/images/congrat-theme.webp';
import consolationStamp from '@/assets/images/consolation-stamp.webp';
import consolation from '@/assets/images/consolation.webp';
import consultStamp from '@/assets/images/consult-stamp.webp';
import cunsult from '@/assets/images/consult.webp';
import etcStamp from '@/assets/images/etc-stamp.webp';
import etc from '@/assets/images/etc.webp';
import fieldTheme from '@/assets/images/field-theme.webp';
import respondentStamp from '@/assets/images/respondent-stamp.webp';
import skyTheme from '@/assets/images/sky-theme.webp';
import vintageTheme from '@/assets/images/vintage-theme.webp';

const PAPER_TYPE_OBJ: PaperTypeObj = {
  BASIC: 'basic',
  CELEBRATE: 'celebrate',
  COMFORT: 'sky',
  PAPER: 'vintage',
  FIELD: 'field',
};

const FONT_TYPE_OBJ = {
  DEFAULT: 'pretendard',
  GYEONGGI: 'batang',
  KYOBO: 'kobyo',
  HIMCHAN: 'himchan',
};

const FONT_LIST: Fonts[] = [
  {
    fontType: 'DEFAULT',
    fontName: '기본',
    fontFamily: 'pretendard',
  },
  {
    fontType: 'GYEONGGI',
    fontName: 'KoPub바탕',
    fontFamily: 'batang',
  },
  {
    fontType: 'KYOBO',
    fontName: '교보손글씨 2020 박도연',
    fontFamily: 'kobyo',
  },
  {
    fontType: 'HIMCHAN',
    fontName: '인천 교육 힘찬',
    fontFamily: 'himchan',
  },
];

const CATEGORYS: Categorys = {
  CONSOLATION: consolationStamp,
  CELEBRATION: celebrationStamp,
  CONSULT: consultStamp,
  ETC: etcStamp,
  답변자: respondentStamp,
};

const CATEGORY_LIST: CategoryList[] = [
  { paperType: 'BASIC', name: '기본', src: basicTheme },
  { paperType: 'CELEBRATE', name: '축하', src: congratTheme },
  { paperType: 'COMFORT', name: '위로', src: skyTheme },
  { paperType: 'PAPER', name: '빈티지', src: vintageTheme },
  { paperType: 'FIELD', name: '들판', src: fieldTheme },
];

const CATEGORY_STAMPS: CategoryStamps[] = [
  { category: 'CONSOLATION', title: '위로와 공감', image: consolation },
  { category: 'CELEBRATION', title: '축하와 응원', image: celebration },
  { category: 'CONSULT', title: '고민 상담', image: cunsult },
  { category: 'ETC', title: '기타', image: etc },
];

export { CATEGORY_LIST, PAPER_TYPE_OBJ, CATEGORYS, CATEGORY_STAMPS, FONT_LIST, FONT_TYPE_OBJ };
