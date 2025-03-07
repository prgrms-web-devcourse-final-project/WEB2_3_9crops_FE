import client from './client';

export const getCurrentRollingPaper = async (): Promise<RollingPaperInformation> => {
  const {
    data: { data },
  } = await client.get('/api/event-posts');
  return data;
};

export const getRollingPaperDetail = async (
  rollingPaperId: string | number,
  page: number,
  size: number,
): Promise<RollingPaper> => {
  const {
    data: { data },
  } = await client.get(`/api/event-posts/${rollingPaperId}`, {
    params: {
      page,
      size,
    },
  });
  console.log(data);
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

export const postNewRollingPaper = async (title: string) => {
  try {
    const {
      data: { data },
    } = await client.post('/api/admin/event-posts', { title });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRollingPaperList = async (
  page: string | number,
  size: number,
): Promise<RollingPaperList> => {
  try {
    const {
      data: { data },
    } = await client.get('/api/admin/event-posts', {
      params: {
        page,
        size,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRollingPaper = async (eventPostId: number | string) => {
  try {
    const { data } = await client.delete(`/api/admin/event-posts/${eventPostId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchRollingPaper = async (eventPostId: number | string) => {
  try {
    const {
      data: { data },
    } = await client.patch(`/api/admin/event-posts/${eventPostId}/status`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
