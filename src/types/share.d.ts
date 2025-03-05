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
  letters: ShareLetter[];
}

// 페이징 포함
interface SharePostResponse {
//   data: any;
  content: SharePost[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
