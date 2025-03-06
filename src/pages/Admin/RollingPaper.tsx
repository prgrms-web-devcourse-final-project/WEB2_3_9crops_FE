import { useState } from 'react';

import { AddIcon, AlarmIcon, DeleteIcon } from '@/assets/icons';

import AddRollingPaperModal from './components/AddRollingPaperModal';
import PageTitle from './components/AdminPageTitle';
import WrapperFrame from './components/WrapperFrame';
import WrapperTitle from './components/WrapperTitle';

export default function AdminRollingPaper() {
  const [activeModal, setActiveModal] = useState(false);

  return (
    <>
      {activeModal && <AddRollingPaperModal onClose={() => setActiveModal(false)} />}
      <PageTitle>게시판 관리 / 롤링 페이퍼 설정</PageTitle>
      <WrapperFrame>
        <section className="flex items-center">
          <WrapperTitle title="롤링페이퍼" Icon={AlarmIcon} />
          <button
            type="button"
            className="ml-auto flex items-center gap-2 rounded-md text-black"
            onClick={() => setActiveModal(true)}
          >
            <AddIcon />
            롤링페이퍼 생성
          </button>
        </section>
        <table className="mt-5 table-auto">
          <thead>
            <tr className="bg-primary-3 border-gray-40 h-14 border-b">
              <th className="w-14 text-center">ID</th>
              <th className="text-left">제목</th>
              <th className="w-30 text-center">쌓인 편지 수</th>
              <th className="w-30 text-center">상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-gray-40 h-14 border-b">
              <td className="w-14 text-center">1</td>
              <td className="text-left">
                침수 피해를 복구중인 포스코 임직원 분들에게 응원의 메시지를 보내주세요!
              </td>
              <td className="w-30 text-center">12</td>
              <td className="text-center">
                <span className="rounded-full border border-amber-500 bg-amber-100/70 px-4 py-1.5 whitespace-nowrap text-amber-500">
                  진행 중
                </span>
              </td>
              <td></td>
            </tr>
            <tr className="border-gray-40 h-14 border-b">
              <td className="w-14 text-center">2</td>
              <td className="text-left">
                침수 피해를 복구중인 포스코 임직원 분들에게 응원의 메시지를 보내주세요!
              </td>
              <td className="w-30 text-center">12</td>
              <td className="w-30 px-2 text-center">
                <button
                  type="button"
                  className="hover:bg-gray-10 text-gray-60 rounded-md px-3 py-1 hover:text-black"
                >
                  진행하기
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="text-gray-60 flex items-center justify-center p-1 hover:text-black"
                >
                  <DeleteIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </WrapperFrame>
    </>
  );
}
