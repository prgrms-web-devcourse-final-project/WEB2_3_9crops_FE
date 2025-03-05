import client from './client';

const getTimeLines = async () => {
  try {
    const res = await client.get('/api/timelines');
    if (!res) throw new Error('타임라인을 받아오는 도중 오류가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchReadNotification = async (timelineId: number) => {
  try {
    const res = await client.patch(`/api/notifications/${timelineId}/read`);
    if (!res) throw new Error('편지 개별 읽음 처리를 하는 도중 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchReadNotificationAll = async () => {
  try {
    const res = await client.patch(`/api/notifications/read`);
    if (!res) throw new Error('편지 개별 읽음 처리를 하는 도중 오류가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

export { getTimeLines, patchReadNotification, patchReadNotificationAll };
