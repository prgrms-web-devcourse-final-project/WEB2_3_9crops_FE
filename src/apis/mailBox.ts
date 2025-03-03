import client from './client';

export const getMailbox = async () => {
  try {
    const response = await client.get('/api/mailbox');
    if (!response) throw new Error('error while fetching mailbox data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMailboxDetail = async (id: number, pageParam: number) => {
  try {
    const response = await client.get(`/api/mailbox/${id}?page=${pageParam}&size=20`);
    // const response = await client.get(`/api/mailbox/${id}`);

    if (!response) throw new Error('error while fetching mailbox detail data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postMailboxDisconnect = async (id: number) => {
  try {
    const response = await client.post(`/api/mailbox/${id}/disconnect`);
    if (!response) throw new Error('error while disconnecting mailbox');
    return response;
  } catch (error) {
    console.error(error);
  }
};
