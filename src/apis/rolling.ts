import client from './client';

export const getCurrentRollingPaper = async (): Promise<RollingPaperInformation> => {
  const {
    data: { data },
  } = await client.get('/api/event-posts');
  return data;
};

export const getRollingPaperDetail = async (
  rollingPaperId: string | number,
): Promise<RollingPaper> => {
  const {
    data: { data },
  } = await client.get(`/api/event-posts/${rollingPaperId}`);
  return data;
};

export const postRollingPaperComment = async (rollingPaperId: string | number, content: string) => {
  const {
    data: { data },
  } = await client.post(`/api/event-posts/${rollingPaperId}/comments`, {
    content,
  });
  return data;
};

export const deleteRollingPaperComment = async (commentId: string | number) => {
  try {
    const {
      data: { data },
    } = await client.delete(`/api/event-posts/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
