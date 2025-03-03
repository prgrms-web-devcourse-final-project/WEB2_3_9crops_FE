import client from './client';

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

const patchReport = async (reportId: number, reportRequest: ReportRequest) => {
  try {
    console.log(`/api/reports/${reportId}`, reportRequest);
    const res = await client.patch(`/api/reports/${reportId}`, reportRequest);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

// badwords
const getBadWords = async (setBadWords: React.Dispatch<React.SetStateAction<BadWords[]>>) => {
  try {
    const res = await client.get('/api/bad-words');
    setBadWords(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const postBadWords = async (badWordsRequest: BadWords, callBack?: () => void) => {
  try {
    const res = await client.post('/api/bad-words', badWordsRequest);
    if (callBack) callBack();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

// 내 상상대로 만든 필터링 단어 취소 버튼
const patchBadWords = async (
  badWordId: number,
  badWordsRequest: BadWords,
  callBack?: () => void,
) => {
  try {
    const res = await client.patch(`/api/bad-words/${badWordId}/status`, badWordsRequest);
    if (callBack) callBack();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { getReports, patchReport, getBadWords, postBadWords, patchBadWords };
