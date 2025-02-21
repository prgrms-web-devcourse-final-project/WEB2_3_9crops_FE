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
