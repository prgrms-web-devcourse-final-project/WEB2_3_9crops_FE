import { getRequest, postRequest } from './api';

export const getMailbox = async () => {
  try {
    const response = getRequest('/api/mailbox');
    if (!response) throw new Error('error while fetching mailbox data');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMailboxDetail = async (id: number) => {
  try {
    const response = getRequest(`/api/mailbox/${id}`);
    if (!response) throw new Error('error while fetching mailbox detail data');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postMailboxDisconnect = async (id: number) => {
  try {
    const response = postRequest(`/api/mailbox/${id}/disconnect`);
    if (!response) throw new Error('error while disconnecting mailbox');
    return response;
  } catch (error) {
    console.error(error);
  }
};
