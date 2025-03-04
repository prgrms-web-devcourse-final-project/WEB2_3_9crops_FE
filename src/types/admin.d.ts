type Status = 'PENDING' | 'RESOLVED' | 'REJECTED';
type ReportType = 'LETTER' | 'POST' | 'COMMENT';
type Reason = 'ABUSE' | 'DEFAMATION' | 'HARASSMENT' | 'THREATS' | 'ETC';

interface Report {
  id: number;
  reporterEmail: string;
  targetEmail: string;
  reportedAt: Date;
  letterId: number | null;
  comment: string | null;
  sharePostId: number | null;
  reportType: reportType;
  reason: Reason;
  reasonDetail: string | null;
  status: Status;
  letterDetail: {
    title: string | null;
    content: string;
  };
}

interface PostReportRequest {
  reportType: ReportType;
  reasonType: Reason | '';
  reason: string;
  letterId: number | null;
}

interface PatchReportRequest {
  status: 'RESOLVED' | 'REJECTED';
  adminMemo: string;
}

// interface ReportDetail {
//   id: number;
//   memberId: number | null;
//   letterId: number | null;
//   sharePostId: number | null;
//   eventId: number | null;
//   reportType: 'LETTER' | 'POST' | 'COMMENT' | 'EVENT';
//   reason: 'ABUSE' | 'DEFAMATION' | 'HARASSMENT' | 'THREATS' | 'ETC';
//   reasonDetail: string | null;
//   status: 'PENDING' | 'RESOLVED' | 'REJECTED';
//   reportedAt: Date;
//   createdAt: Date;
//   letterDetail: {
//     title: string;
//     content: string;
//   };
// }

// badWords
interface BadWords {
  word: string;
}

//
interface ModalContents {
  title: string;
  onClick: () => void;
}
