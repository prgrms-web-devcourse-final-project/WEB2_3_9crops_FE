import basicTheme from '@/assets/images/basic-theme.png';
import congratThemeFrame from '@/assets/images/congrat-theme-frame.png';
import congratTheme from '@/assets/images/congrat-theme.png';
import fieldThemeFrame from '@/assets/images/field-theme-frame.png';
import fieldTheme from '@/assets/images/field-theme.png';
import skyThemeFrame from '@/assets/images/sky-theme-frame.png';
import skyTheme from '@/assets/images/sky-theme.png';
import vintageThemeFrame from '@/assets/images/vintage-theme-frame.png';
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
  기본: '',
  축하: congratThemeFrame,
  위로: skyThemeFrame,
  빈티지: vintageThemeFrame,
  들판: fieldThemeFrame,
};

export { themes, themeObj };
