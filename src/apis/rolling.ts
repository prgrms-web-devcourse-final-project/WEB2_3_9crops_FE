import { client } from './client';

export const getCurrentRollingPaper = async (): Promise<RollingPaperInformation> => {
  try {
    const {
      data: { data },
    } = await client.get('/event-posts');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRollingPaperDetail = async (id: string | number): Promise<RollingPaper> => {
  try {
    const {
      data: { data },
    } = await client.get(`/event-posts/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
