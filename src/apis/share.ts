import client from './client';

//공유 게시글 상세 페이지 편지
interface ShareLetter {
  id: number;
  content: string;
  writerZipCode: string;
  receiverZipCode: string;
}

// 공유 게시글 목록 조회 타입
export interface SharePost {
  writerZipCode: number;
  receiverZipCode: number;
  content: string;
  createdAt: string;
  active: boolean;
  sharePostId: number;
  sharePostContent: string;
  letters: ShareLetter[];
}

// 페이징 포함
export interface SharePostResponse {
  content: SharePost[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 편지 공유 수락 / 거절
export interface SharePostApproval {
  shareProposalId: number;
  status: 'APPROVED' | 'REJECTED';
  sharePostId: number;
}

// 공유 게시글 목록 조회
export const getSharePostList = async (
  page: number = 1,
  size: number = 10,
): Promise<SharePostResponse> => {
  try {
    const response = await client.get('/api/share-posts', {
      params: { page, size },
    });
    console.log(`🌟공유 게시글 목록`, response.data.data);

    return response.data.data;
  } catch (error) {
    console.error('❌ 편지 공유 게시글 목록을 조회하던 중 에러가 발생했습니다', error);
    throw new Error('편지 공유 게시글 목록 조회 실패');
  }
};

// 공유 게시글 상세 조회
export const getSharePostDetail = async (sharePostId: number): Promise<SharePost> => {
  try {
    const response = await client.get(`/api/share-posts/${sharePostId}`);
    console.log(`🔥공유 게시글 상세 데이터`, response.data);
    return response.data.data;
  } catch (error) {
    console.error('❌ 편지 공유 게시글을 상세 조회하던 중 에러가 발생했습니다', error);
    throw new Error('편지 공유 게시글 상세 조회 실패');
  }
};

// 공유 요청 보내기
export const postShareProposals = async (
  letterIds: number[],
  requesterId: number,
  recipientId: number,
  message: string,
) => {
  try {
    const response = await client.post('/api/share-proposals', {
      letterIds: letterIds,
      requesterId,
      recipientId,
      message,
    });
    if (!response) throw new Error('error while fetching mailbox data');
    return response.data;
  } catch (error) {
    console.error('❌ 공유 요청 보내기 중 에러가 발생했습니다', error);
    throw new Error('공유 요청 실패');
  }
};

// 편지 공유 수락 / 거절
export const postShareProposalApproval = async (
  shareProposalId: number,
  action: 'approve' | 'reject',
): Promise<SharePostApproval> => {
  try {
    const response = await client.patch(`/api/share-proposal/${shareProposalId}/${action}`);
    return response.data;
  } catch (error) {
    console.error(
      `❌ 편지 공유 ${action === 'approve' ? '수락' : '거절'} 중 에러가 발생했습니다`,
      error,
    );
    throw new Error(`편지 공유 ${action === 'approve' ? '수락' : '거부'} 실패`);
  }
};
