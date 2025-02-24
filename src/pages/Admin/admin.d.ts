interface Report {
  id: number;
  reporterEmail: string;
  targetEmail: string;
  reportedAt: Date;
  letterId: number | null;
  comment: string | null;
  sharePostId: number | null;
  reportType: 'LETTER' | 'POST' | 'COMMENT';
  reason: 'ABUSE' | 'DEFAMATION' | 'HARASSMENT' | 'THREATS' | 'ETC';
  reasonDetail: string | null;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
}

interface ReportDetail {
  id: number;
  memberId: number | null;
  letterId: number | null;
  sharePostId: number | null;
  eventId: number | null;
  reportType: 'LETTER' | 'POST' | 'COMMENT' | 'EVENT';
  reason: 'ABUSE' | 'DEFAMATION' | 'HARASSMENT' | 'THREATS' | 'ETC';
  reasonDetail: string | null;
  status: 'PENDING' | 'RESOLVED' | 'REJECTED';
  reportedAt: Date;
  createdAt: Date;
  letterDetail: {
    title: string;
    content: string;
  };
}
