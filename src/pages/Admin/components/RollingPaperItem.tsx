import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRollingPaper } from '@/apis/rolling';
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

  return (
    <tr className="border-gray-40 h-14 border-b">
      <td className="w-14 text-center">{information.eventPostId}</td>
      <td className="text-left">{information.title}</td>
      <td className="text-center">
        {information.used ? (
          <span className="rounded-full border border-amber-500 bg-amber-100/70 px-4 py-1.5 whitespace-nowrap text-amber-500">
            진행 중
          </span>
        ) : (
          <button
            type="button"
            className="hover:bg-gray-10 text-gray-60 rounded-md px-3 py-1 hover:text-black"
          >
            진행하기
          </button>
        )}
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

{
  /* <tr className="border-gray-40 h-14 border-b">
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
</tr>; */
}
