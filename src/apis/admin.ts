import client from './client';

const getReports = async (
  setReports: React.Dispatch<React.SetStateAction<Report[]>>,
  queryString: string = '',
  callBack?: () => void,
) => {
  try {
    const res = await client.get(`/api/reports${queryString}`);
    setReports(res.data.data);
    if (callBack) callBack();
    console.log(res.data.data);
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

//
const getBadWords = async (setBadWords: React.Dispatch<React.SetStateAction<BadWords[]>>) => {
  try {
    const res = await client.get('/api/bad-words');
    setBadWords(res.data.data);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export { getReports, patchReport, getBadWords };
