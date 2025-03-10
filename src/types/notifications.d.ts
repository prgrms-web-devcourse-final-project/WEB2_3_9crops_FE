type AlarmType = 'SENDING' | 'LETTER' | 'REPORT' | 'SHARE' | 'POSTED';

interface Noti {
  timelineId: number;
  alarmType: AlarmType;
  content: string | number;
  title: string;
  read: boolean;
}
