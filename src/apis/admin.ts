import client from './client';

const postReports = async (postReportRequest: PostReportRequest) => {
  try {
    const res = await client.post(`/api/reports`, postReportRequest);
    if (!res) throw new Error('신고 요청중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getReports = async (reportQueryString: ReportQueryString) => {
  try {
    const queryParams = new URLSearchParams();
    if (reportQueryString.reportType !== null)
      queryParams.append('reportType', reportQueryString.reportType);
    if (reportQueryString.status !== null) queryParams.append('status', reportQueryString.status);
    if (reportQueryString.page !== null) queryParams.append('page', reportQueryString.page);
    if (reportQueryString.size !== null) queryParams.append('size', reportQueryString.size);

    const queryStrings = queryParams.toString();
    const res = await client.get(`/api/reports?${queryStrings}`);
    if (!res) throw new Error('신고 목록 데이터 조회 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchReport = async (reportId: number, patchReportRequest: PatchReportRequest) => {
  try {
    const res = await client.patch(`/api/reports/${reportId}`, patchReportRequest);
    return res;
  } catch (error) {
    console.error(error);
  }
};

// badwords
const getBadWords = async () => {
  try {
    const res = await client.get('/api/bad-words');
    if (!res) throw new Error('금칙어 조회 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postBadWords = async (badWordsRequest: BadWords) => {
  try {
    const res = await client.post('/api/bad-words', badWordsRequest);
    if (!res) throw new Error('금칙어 등록 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchBadWordsUsed = async (badWordId: string, isUsed: string) => {
  const reverseIsUsed = isUsed === 'true' ? false : true;

  try {
    const res = await client.patch(`/api/bad-words/${badWordId}/status`, { isUsed: reverseIsUsed });
    if (!res) throw new Error('검열 활성화/비활성화 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchBadWords = async (badWordId: string, word: string) => {
  try {
    const res = await client.patch(`/api/bad-words/${badWordId}`, { word: word });
    if (!res) throw new Error('금칙어 수정중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteBadWords = async (id: string) => {
  try {
    const res = await client.delete(`/api/bad-words/${id}`);
    if (!res) throw new Error('금칙어 삭제 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

export {
  postReports,
  getReports,
  patchReport,
  getBadWords,
  postBadWords,
  patchBadWordsUsed,
  patchBadWords,
  deleteBadWords,
};
