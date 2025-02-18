import basicTheme from '@/assets/images/basic-theme.png';
import congratTheme from '@/assets/images/congrat-theme.png';
import fieldTheme from '@/assets/images/field-theme.png';
import skyTheme from '@/assets/images/sky-theme.png';
import vintageTheme from '@/assets/images/vintage-theme.png';

import { T_theme_info, T_theme_obj } from '../write';

const themes: T_theme_info[] = [
  { name: '기본', src: basicTheme },
  { name: '축하', src: congratTheme },
  { name: '위로', src: skyTheme },
  { name: '빈티지', src: vintageTheme },
  { name: '들판', src: fieldTheme },
];

const themeObj: T_theme_obj = {
  기본: 'basic',
  축하: 'celebrate',
  위로: 'sky',
  빈티지: 'vintage',
  들판: 'field',
};

export { themes, themeObj };
