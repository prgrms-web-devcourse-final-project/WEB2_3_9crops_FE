import basicTheme from '@/assets/images/basic-theme.png';
import celebrationStamp from '@/assets/images/celebration-stamp.png';
import celebration from '@/assets/images/celebration.png';
import congratTheme from '@/assets/images/congrat-theme.png';
import consolationStamp from '@/assets/images/consolation-stamp.png';
import consolation from '@/assets/images/consolation.png';
import consultStamp from '@/assets/images/consult-stamp.png';
import cunsult from '@/assets/images/consult.png';
import etcStamp from '@/assets/images/etc-stamp.png';
import etc from '@/assets/images/etc.png';
import fieldTheme from '@/assets/images/field-theme.png';
import respondentStamp from '@/assets/images/respondent-stamp.png';
import skyTheme from '@/assets/images/sky-theme.png';
import vintageTheme from '@/assets/images/vintage-theme.png';

const THEMES: ThemeInfo[] = [
  { name: '기본', src: basicTheme },
  { name: '축하', src: congratTheme },
  { name: '위로', src: skyTheme },
  { name: '빈티지', src: vintageTheme },
  { name: '들판', src: fieldTheme },
];

const THEME_OBJ: ThemeObj = {
  기본: 'basic',
  축하: 'celebrate',
  위로: 'sky',
  빈티지: 'vintage',
  들판: 'field',
};

const STAMPS: Stamps = {
  '축하와 응원': celebrationStamp,
  '위로와 공감': consolationStamp,
  '고민 상담': consultStamp,
  기타: etcStamp,
  답변자: respondentStamp,
};

const CATEGORY_STAMPS: CategoryStamps[] = [
  { title: '위로와 공감', image: consolation },
  { title: '축하와 응원', image: celebration },
  { title: '고민 상담', image: cunsult },
  { title: '기타', image: etc },
];

export { THEMES, THEME_OBJ, STAMPS, CATEGORY_STAMPS };
