import { useState } from 'react';

import { AlarmIcon, ArrowLeftIcon, PersonIcon } from '@/assets/icons';
import ConfirmModal from '@/components/ConfirmModal';

const DUMMY_TEMP = 48.5;
const DUMMY_ZIP_CODE = '235EA';

const MyPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {isOpenModal && (
        <ConfirmModal
          title="정말 탈퇴하시겠어요?"
          description="탈퇴하시면, 지금까지 나눈 따듯한 마음들이 사라져요"
          cancelText="되돌아가기"
          confirmText="탈퇴하기"
          onCancel={() => setIsOpenModal(false)}
          onConfirm={() => setIsOpenModal(false)}
        />
      )}
      <header className="sticky top-0 flex items-center justify-between p-5">
        <ArrowLeftIcon className="h-6 w-6 text-white" />
        <div className="flex items-center gap-3">
          <AlarmIcon className="h-6 w-6 text-white" />
          <PersonIcon className="h-6 w-6 text-white" />
        </div>
      </header>
      <main className="flex grow flex-col gap-12 px-5 pt-9 pb-6">
        <section className="h2-b mx-auto flex gap-1.5">
          {DUMMY_ZIP_CODE.split('').map((code, index) => (
            <div
              key={index}
              className="flex h-13.5 w-10 items-center justify-center rounded-sm bg-white inset-shadow-[0_4px_4px_0] inset-shadow-black/10"
            >
              {code}
            </div>
          ))}
        </section>
        <section>
          <div className="mb-2 flex justify-between">
            <p className="body-sb text-gray-60">따듯한 따숨님</p>
            <p className="body-sb text-accent-1">{DUMMY_TEMP}도</p>
          </div>
          <div className="h-4 w-full rounded-full bg-white">
            <div
              className="h-full w-[calc(${degree}%)] rounded-full bg-[#FFB5AC]"
              style={{ width: `calc(${DUMMY_TEMP}%)` }}
            />
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-40 body-sb">활동</h3>
            <p className="body-sb text-gray-100">내가 올린 게시물</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-40 body-sb">고객 센터</h3>
            <p className="body-sb text-gray-100">운영자에게 문의하기</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-40 body-sb">계정</h3>
            <div className="flex justify-between">
              <p className="body-sb text-gray-100">로그인 정보</p>
              <p className="body-r text-gray-60">
                <span className="mr-2">카카오</span>
                <span>kakaoAccount@kakao.com</span>
              </p>
            </div>
            <p className="body-sb text-gray-100">로그아웃</p>
          </div>
        </section>
        <button
          type="button"
          className="text-gray-60 body-m mt-auto self-start underline"
          onClick={() => setIsOpenModal(true)}
        >
          탈퇴하기
        </button>
      </main>
    </>
  );
};

export default MyPage;
