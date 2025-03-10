import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { getMailbox } from '@/apis/mailBox';
import DoorImg from '@/assets/images/door.png';
import ClosedWindowImg from '@/assets/images/window-disabled.png';
import PageTitle from '@/components/PageTitle';
import { chunkBox } from '@/utils/chunkBox';

import LetterBoxItem from './components/LetterBoxItem';

const fetchMailLists = async () => {
  const response = await getMailbox();
  if (!response) throw new Error();
  const data: LetterBoxData[] = response.data;
  console.log(data);
  return data;
};

const LetterBoxPage = () => {
  const {
    data: letterBox = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mailBox'],
    queryFn: fetchMailLists,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const navigate = useNavigate();

  if (isError) {
    navigate('/NotFound');
  }

  return (
    <main className="flex grow flex-col items-center px-5 pt-20">
      <PageTitle>내 편지함</PageTitle>
      <div className="w-full max-w-94">
        <p className="body-sb mt-16 mb-[7px] place-self-start text-gray-50">
          나와 연락한 사람들 {letterBox?.length}
        </p>
        <section className="letter-box-bg flex grow flex-col items-center px-4 pt-5">
          <div className="flex w-full flex-col gap-5">
            {isLoading ? (
              <p className="body-m text-gray-60 text-center">로딩중..</p>
            ) : letterBox.length > 0 ? (
              chunkBox(
                letterBox.map((data: LetterBoxData, index) => (
                  <LetterBoxItem
                    boxId={data.letterMatchingId}
                    key={index}
                    zipCode={data.oppositeZipCode}
                    letterCount={data.letterCount}
                    isChecked={data.oppositeRead}
                    isClosed={!data.active}
                    oppositeId={data.oppositeId}
                  />
                )),
              ).map((row, index) =>
                row.length === 3 ? (
                  <div key={index} className="flex justify-between">
                    {row}
                  </div>
                ) : (
                  <div key={index} className="flex justify-between">
                    {row}
                    <img src={ClosedWindowImg} alt="닫힌 문 이미지" className="h-28 w-23" />
                    {row.length === 1 && (
                      <img src={ClosedWindowImg} alt="닫힌 문 이미지" className="h-28 w-23" />
                    )}
                  </div>
                ),
              )
            ) : (
              <p className="body-m text-gray-60 text-center">아직 주고 받은 편지가 없어요</p>
            )}
            <div className="flex justify-between">
              <img src={ClosedWindowImg} alt="닫힌 문 이미지" className="h-28 w-23" />
              <img src={DoorImg} alt="출입문 이미지" />
              <img src={ClosedWindowImg} alt="닫힌 문 이미지" className="h-28 w-23" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LetterBoxPage;
