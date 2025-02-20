import { BoardIcon, EnvelopeIcon, SirenFilledIcon } from '@/assets/icons';

export const NOTIFICATION_ICON: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  letter: EnvelopeIcon,
  warning: SirenFilledIcon,
  board: BoardIcon,
};
