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

// 공유 게시글 목록 조회 - 페이징 포함
export interface SharePostResponse {
  content: SharePost[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 편지 공유 요청 수신 조회
export interface ShareProposal {
  shareProposalId: number;
  requesterZipCode: string;
  recipientZipCode: string;
  message: string;
  status: 'REJECTED' | 'APPROVED' | 'PENDING';
}

//편지 공유 요청 상세 조회
export interface ShareProposalLetter {
  id: number;
  content: string;
  writerZipCode: string;
  receiverZipCode: string;
  createdAt: string;
}

export interface ShareProposalDetail {
  shareProposalId: number;
  requesterZipCode: string;
  recipientZipCode: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  letters: ShareProposalLetter[];
}

// 편지 공유 수락 / 거절
export interface ShareProposalApproval {
  shareProposalId: number;
  status: 'APPROVED' | 'REJECTED';
  sharePostId: number;
}

// 공유 게시글 목록 조회
export const getSharePostList = async (page: number = 1, size: number = 10) => {
  try {
    const response = await client.get('/api/share-posts', {
      params: { page, size },
    });

    return response.data.data;
  } catch (error) {
    console.error('❌ 편지 공유 게시글 목록을 조회하던 중 에러가 발생했습니다', error);
    throw new Error('편지 공유 게시글 목록 조회 실패');
  }
};

// 공유 게시글 상세 조회
export const getSharePostDetail = async (sharePostId: string): Promise<SharePost> => {
  try {
    const response = await client.get(`/api/share-posts/${sharePostId}`);
    return response.data.data;
  } catch (error) {
    console.error('❌ 편지 공유 게시글을 상세 조회하던 중 에러가 발생했습니다', error);
    throw new Error('편지 공유 게시글 상세 조회 실패');
  }
};

// 공유 요청 보내기
export const postShareProposals = async (
  letterIds: number[],
  recipientId: number,
  message: string,
) => {
  try {
    const response = await client.post('/api/share-proposals', {
      letterIds: letterIds,
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

// 편지 공유 요청 수신 조회
export const getShareProposalList = async () => {
  try {
    const response = await client.get('/api/share-proposals/inbox');

    return response.data.data;
  } catch (error) {
    console.error('❌ 편지 공유 요청을 조회하던 중 에러가 발생했습니다', error);
    throw error;
  }
};

// 편지 공유 요청 상세 조회
export const getShareProposalDetail = async (
  shareProposalId: number,
): Promise<ShareProposalDetail> => {
  try {
    const response = await client.get(`/api/share-proposals/${shareProposalId}`);
    return response.data.data;
  } catch (error) {
    console.error('❌ 편지 공유 요청을 상세 조회하던 중 에러가 발생했습니다', error);
    throw error;
  }
};

// 편지 공유 수락 / 거절
export const postShareProposalApproval = async (
  shareProposalId: number,
  action: 'approve' | 'reject',
): Promise<ShareProposalApproval> => {
  try {
    const response = await client.patch(`/api/share-proposals/${shareProposalId}/${action}`);
    return response.data;
  } catch (error) {
    console.error(
      `❌ 편지 공유 ${action === 'approve' ? '수락' : '거절'} 중 에러가 발생했습니다`,
      error,
    );
    throw new Error(`편지 공유 ${action === 'approve' ? '수락' : '거부'} 실패`);
  }
};

// 편지 좋아요 추가, 취소
export const postSharePostLike = async (sharePostId: string) => {
  try {
    const response = await client.post(`/api/share-posts/${sharePostId}/likes`);
    if (!response) throw new Error('error while posting like');
    return response.data;
  } catch (error) {
    console.error('❌ 편지 좋아요 중 에러가 발생했습니다', error);
  }
};

// 편지 좋아요 갯수
export const getSharePostLikeCount = async (sharePostId: string) => {
  try {
    const response = await client.get(`/api/share-posts/${sharePostId}/likes`);
    if (!response) throw new Error('error while fetching likes');
    return response.data;
  } catch (error) {
    console.error('❌ 편지 좋아요 갯수 조회 중 에러가 발생했습니다', error);
  }
};

export const deleteSharePost = async (sharePostId: string) => {
  try {
    const response = await client.delete(`/api/share-posts/${sharePostId}`);
    if (!response) throw new Error('error while deleting post');
    return response;
  } catch (error) {
    console.error('❌ 편지 삭제 중 에러가 발생했습니다', error);
  }
};
