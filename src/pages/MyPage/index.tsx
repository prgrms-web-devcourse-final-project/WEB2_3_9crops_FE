import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { deleteUserInfo } from '@/apis/auth';
import ConfirmModal from '@/components/ConfirmModal';
import useAuthStore from '@/stores/authStore';
import useMyPageStore from '@/stores/myPageStore';

import { TEMPERATURE_RANGE } from './constants';

const MyPage = () => {
  useEffect(() => {
    fetchMyPageInfo();
  }, []);

  const { data, fetchMyPageInfo } = useMyPageStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const getDescriptionByTemperature = (temp: number) => {
    const range = TEMPERATURE_RANGE.find((range) => temp >= range.min && temp < range.max);
    return range?.description;
  };

  const description = getDescriptionByTemperature(Number(data.temperature));

  const handleLeave = async () => {
    try {
      const response = await deleteUserInfo();
      if (!response) throw new Error('deletioning failed');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpenModal && (
        <ConfirmModal
          title="정말 탈퇴하시겠어요?"
          description="탈퇴하시면, 지금까지 나눈 따뜻한 마음들이 사라져요"
          cancelText="되돌아가기"
          confirmText="탈퇴하기"
          onCancel={() => setIsOpenModal(false)}
          onConfirm={() => {
            handleLeave();
            setIsOpenModal(false);
          }}
        />
      )}
      <main className="flex grow flex-col gap-12 px-5 pt-20 pb-6">
        <h1 className="h2-b mx-auto flex gap-1.5">
          {data.zipCode.split('').map((code, index) => (
            <div
              key={index}
              className="flex h-13.5 w-10 items-center justify-center rounded-sm bg-white inset-shadow-[0_4px_4px_0] inset-shadow-black/10"
            >
              {code}
            </div>
          ))}
        </h1>
        <section>
          <h2 className="mb-2 flex justify-between">
            <p className="body-sb text-gray-60 dark:text-white">{description}</p>
            <p className="body-sb text-accent-2">{data.temperature}도</p>
          </h2>
          <div className="h-4 w-full rounded-full bg-white">
            <div
              className="h-full w-[calc(${degree}%)] rounded-full bg-[#FFB5AC]"
              style={{ width: `calc(${data.temperature}%)` }}
            />
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-40 body-sb dark:text-gray-10">활동</h3>
            <Link to="board">
              <p className="body-sb text-gray-100 dark:text-white">내가 올린 게시물</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-40 body-sb dark:text-gray-10">고객 센터</h3>
            <a
              href="https://forms.gle/ZagrTSZzJhogudSY8"
              target="_blank"
              className="body-sb text-gray-100 dark:text-white"
            >
              운영자에게 문의하기
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-40 body-sb dark:text-gray-10">계정</h3>
            <div className="flex justify-between">
              <p className="body-sb text-gray-100 dark:text-white">로그인 정보</p>
              <p className="body-r text-gray-60 dark:text-white">
                <span className="mr-2">{data.social}</span>
                <span>{data.email}</span>
              </p>
            </div>
            <button
              className="body-sb self-start text-gray-100 dark:text-white"
              onClick={() => {
                logout();
              }}
            >
              로그아웃
            </button>
          </div>
        </section>
        <button
          type="button"
          className="text-gray-60 body-m mt-auto self-start underline dark:text-white"
          onClick={async () => {
            setIsOpenModal(true);
          }}
        >
          탈퇴하기
        </button>
      </main>
    </>
  );
};

export default MyPage;
