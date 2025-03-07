import { BoardIcon, EnvelopeIcon, SirenFilledIcon } from '@/assets/icons';

export const NOTIFICATION_ICON: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  LETTER: EnvelopeIcon,
  REPORT: SirenFilledIcon,
  SHARE: BoardIcon,
  POSTED: BoardIcon,
};
