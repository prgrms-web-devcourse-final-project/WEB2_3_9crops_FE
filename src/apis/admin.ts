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
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchReport = async (reportId: number, patchReportRequest: PatchReportRequest) => {
  try {
    console.log(`/api/reports/${reportId}`, patchReportRequest);
    const res = await client.patch(`/api/reports/${reportId}`, patchReportRequest);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

// badwords
const getBadWords = async () => {
  try {
    const res = await client.get('/api/bad-words');
    if (!res) throw new Error('금칙어 조회 도중 에러가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const postBadWords = async (badWordsRequest: BadWords) => {
  try {
    const res = await client.post('/api/bad-words', badWordsRequest);
    console.log(res);
    if (!res) throw new Error('금칙어 등록 도중 에러가 발생했습니다.');
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 내 상상대로 만든 필터링 단어 취소 버튼
const patchBadWordsUsed = async (badWordId: string) => {
  try {
    const res = await client.patch(`/api/bad-words/${badWordId}/status`, { isUsed: false });
    if (!res) throw new Error('검열 단어 삭제 도중 에러가 발생했습니다.');
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const patchBadWords = async (badWordId: string, word: string) => {
  try {
    const res = await client.patch(`/api/bad-words/${badWordId}`, { word: word });
    if (!res) throw new Error('검열 단어 삭제 도중 에러가 발생했습니다.');
    console.log(res);
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
};
