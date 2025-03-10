import { create } from 'zustand';

import { fetchMyPageInfo } from '@/apis/myPage';

interface MyPageDataStore {
  zipCode: string;
  temperature: string;
  social: string;
  email: string;
  warningCount: number;
}

interface MyPageStore {
  data: MyPageDataStore;
  message: string;
  setMyPageData: (newData: MyPageDataStore) => void;
  fetchMyPageInfo: () => void;
}
const useMyPageStore = create<MyPageStore>((set) => ({
  data: {
    zipCode: '',
    temperature: '',
    social: '',
    email: '',
    warningCount: 0,
  },
  message: '',
  setMyPageData: (newData) => set({ data: newData }),
  fetchMyPageInfo: async () => {
    try {
      const responseData = await fetchMyPageInfo();
      set({ data: responseData.data, message: responseData.message });
    } catch (error) {
      console.error('데이터를 불러오던 중 에러가 발생했습니다', error);
    }
  },
}));

export default useMyPageStore;
