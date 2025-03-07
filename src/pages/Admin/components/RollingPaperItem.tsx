import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteRollingPaper, patchRollingPaper } from '@/apis/rolling';
import { DeleteIcon } from '@/assets/icons';

interface RollingPaperItemProps {
  information: AdminRollingPaperInformation;
}

export default function RollingPaperItem({ information }: RollingPaperItemProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteRollingPaper(information.eventPostId),
    onSuccess: () => {
      // TODO: 페이지네이션 적용 후, 현재 page에 대한 캐싱 날리는 방식으로 변경
      queryClient.invalidateQueries({ queryKey: ['admin-rolling-paper'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: () => patchRollingPaper(information.eventPostId),
    onSuccess: () => {
      // TODO: 기존 데이터 수정하는 방식으로 ㄱㄱㄱㄱㄱㄱㄱ
      // 일단 임시로 캐싱 날리기
      queryClient.invalidateQueries({ queryKey: ['admin-rolling-paper'] });
    },
    onError: (err: AxiosError<{ code: string; message: string }>) => {
      if (err.response?.data.code === 'EVENT-004') {
        alert(err.response.data.message);
      }
      console.error(err);
    },
  });

  // TODO: 진짜 삭제하겠냐고 물어보기
  return (
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
        >
          {information.used ? '중단하기' : '진행하기'}
        </button>
      </td>
      <td className="w-6">
        {!information.used && (
          <button
            type="button"
            className="text-gray-60 flex items-center justify-center p-1 hover:text-black"
            onClick={() => deleteMutate()}
          >
            <DeleteIcon className="h-5 w-5" />
          </button>
        )}
      </td>
    </tr>
  );
}
