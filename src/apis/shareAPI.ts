import { getRequest, postRequest } from './api';

export const postShareProposals = async (
  letterIds: number[],
  requesterId: number,
  recipientId: number,
  message: string,
) => {
  try {
    const response = postRequest('/api/share-proposals', {
      letterIds: letterIds,
      requesterId: requesterId,
      recipientId: recipientId,
      message: message,
    });
    if (!response) throw new Error('error while fetching mailbox data');
    return response;
  } catch (error) {
    console.error(error);
  }
};
