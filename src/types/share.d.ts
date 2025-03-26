//공유 게시글 상세 페이지 편지
interface ShareLetter {
  id: number;
  content: string;
  writerZipCode: string;
  receiverZipCode: string;
}

// 공유 게시글 목록 조회 타입
interface SharePost {
  writerZipCode: string;
  receiverZipCode: string;
  content: string;
  createdAt: string;
  active: boolean;
  sharePostId: number;
  sharePostContent: string;
  zipCode: string;
  letters: ShareLetter[];
}

// 페이징 포함
interface SharePostResponse {
  content: SharePost[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 편지 공유 요청 수신 조회
interface ShareProposal {
  shareProposalId: number;
  requesterZipCode: string;
  recipientZipCode: string;
  message: string;
  status: 'REJECTED' | 'APPROVED' | 'PENDING';
}

//편지 공유 요청 상세 조회
interface ShareProposalLetter {
  id: number;
  content: string;
  writerZipCode: string;
  receiverZipCode: string;
  createdAt: string;
}

interface ShareProposalDetail {
  shareProposalId: number;
  requesterZipCode: string;
  recipientZipCode: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  letters: ShareProposalLetter[];
}

// 편지 공유 수락 / 거절
interface ShareProposalApproval {
  shareProposalId: number;
  status: 'APPROVED' | 'REJECTED';
  sharePostId: number;
}
