import { BoardIcon, EnvelopeIcon, SirenIcon } from '@/assets/icons';

export const NOTIFICATION_ICON: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  letter: EnvelopeIcon,
  warning: SirenIcon,
  board: BoardIcon,
};
