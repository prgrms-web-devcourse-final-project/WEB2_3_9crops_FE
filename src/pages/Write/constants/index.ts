import basicTheme from '@/assets/images/basic-theme.png';
import celebrationStamp from '@/assets/images/celebration-stamp.png';
import congratTheme from '@/assets/images/congrat-theme.png';
import consolationStamp from '@/assets/images/consolation-stamp.png';
import consultStamp from '@/assets/images/consult-stamp.png';
import etcStamp from '@/assets/images/etc-stamp.png';
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

const STAMPS = {
  '축하와 응원': celebrationStamp,
  '위로와 공감': consolationStamp,
  '고민 상담': consultStamp,
  기타: etcStamp,
  답변자: respondentStamp,
};

export { THEMES, THEME_OBJ, STAMPS };
