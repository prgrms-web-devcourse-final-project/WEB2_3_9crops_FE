import { create } from 'zustand';

import { fetchMyPageInfo } from '@/apis/mypage';

interface MyPageDataStore {
  zipCode: string;
  temperature: string;
  social: string;
  email: string;
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
