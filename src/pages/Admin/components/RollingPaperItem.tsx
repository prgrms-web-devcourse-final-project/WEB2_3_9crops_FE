import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteRollingPaper, patchRollingPaper } from '@/apis/rolling';
import { DeleteIcon } from '@/assets/icons';
import { useState } from 'react';
import ConfirmModal from '@/components/ConfirmModal';

interface RollingPaperItemProps {
  information: AdminRollingPaperInformation;
  currentPage: string | number;
}

export default function RollingPaperItem({ information, currentPage }: RollingPaperItemProps) {
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteRollingPaper(information.eventPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rolling-paper', currentPage] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: () => patchRollingPaper(information.eventPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rolling-paper', currentPage] });
    },
    onError: (err: AxiosError<{ code: string; message: string }>) => {
      if (err.response?.data.code === 'EVENT-004') {
        alert(err.response.data.message);
      }
      console.error(err);
    },
  });

  return (
    <>
      {activeDeleteModal && (
        <ConfirmModal
          title="정말 롤링페이퍼를 삭제하시겠어요?"
          description="롤링페이퍼를 삭제하는 경우 복구가 불가능합니다!"
          cancelText="되돌아가기"
          confirmText="삭제하기"
          onCancel={() => {
            setActiveDeleteModal(false);
          }}
          onConfirm={deleteMutate}
        />
      )}
      <tr className="border-gray-40 h-14 border-b">
        <td className="w-14 text-center">{information.eventPostId}</td>
        <td className="text-left">
          <div>
            {information.used && (
              <span className="mr-2 rounded-full border border-amber-500 bg-amber-100/70 px-3 py-0.5 whitespace-nowrap text-amber-500">
                진행 중
              </span>
            )}
            {information.title}
          </div>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="hover:bg-gray-10 text-gray-60 rounded-md px-3 py-1 hover:text-black"
            onClick={() => toggleStatus()}
            aria-label={information.used ? '중단하기' : '진행하기'}
          >
            {information.used ? '중단하기' : '진행하기'}
          </button>
        </td>
        <td className="w-6">
          {!information.used && (
            <button
              type="button"
              className="text-gray-60 flex items-center justify-center p-1 hover:text-black"
              onClick={() => setActiveDeleteModal(true)}
              aria-label="삭제하기"
            >
              <DeleteIcon className="h-5 w-5" />
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
