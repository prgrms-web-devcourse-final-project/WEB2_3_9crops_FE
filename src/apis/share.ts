import client from './client';

// 공유 게시글 목록 조회 타입
export interface SharePost {
  writerZipCode: number;
  receiverZipCode: number;
  content: string;
  createdAt: string;
  active: boolean;
  sharePostId: number;
  sharePostContent: string;
}

// 페이징 포함
export interface SharePostResponse {
  content: SharePost[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
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
    console.log(`🌟공유 게시글 목록`, response.data);

    return response.data;
  } catch (error) {
    console.error('❌ 편지 공유 게시글 목록을 조회하던 중 에러가 발생했습니다', error);
    throw new Error('편지 공유 게시글 목록 조회 실패');
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
    return response;
  } catch (error) {
    console.error(error);
  }
};
