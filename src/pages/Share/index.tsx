import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getShareProposalDetail } from '@/apis/share';
import { postShareProposalApproval, ShareProposalDetail } from '@/apis/share';

import { twMerge } from 'tailwind-merge';
import Letter from '../LetterBoardDetail/components/Letter';

import BlurImg from '@/assets/images/landing-blur.png';

const ShareApprovalPage = () => {
  const navigate = useNavigate();
  const { shareProposalId } = useParams();
  console.log(shareProposalId);

  const [proposalDetail, setProposalDetail] = useState<ShareProposalDetail>();

  const handleProposalApproval = async (action: 'approve' | 'reject') => {
    try {
      const result = await postShareProposalApproval(Number(shareProposalId), action);
      console.log(`✅ 편지 공유 ${action === 'approve' ? '수락' : '거절'}됨:`, result);
      navigate('/');
    } catch (error) {
      console.error('❌공유 요청 처리 중 에러 발생', error);
    }
  };
  useEffect(() => {
    const fetchProposalDetail = async (id: string) => {
      try {
        const data = await getShareProposalDetail(Number(id));
        setProposalDetail(data);
      } catch (error) {
        console.error('❌ 공유 요청 상세 조회에 실패했습니다.', error);
        throw error;
      }
    };

    if (shareProposalId) {
      fetchProposalDetail(shareProposalId);
    }
  }, [shareProposalId]);

  return (
    <div className="grow bg-white">
      <main className="px-5 pt-18 pb-3">
        <p className="body-b mb-6 px-5">FROM. {proposalDetail?.requesterZipCode}</p>
        <p
          className={twMerge(
            'body-r bg-[repeating-linear-gradient(transparent,transparent_25px,#ffe6e3_26px)] px-5 whitespace-pre-wrap',
            'leading-[26px]',
          )}
        >
          {proposalDetail?.message}
        </p>
        <section className="flex flex-col gap-6.5 px-5 py-6.5">
          {proposalDetail?.letters.map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              isWriter={letter.writerZipCode === proposalDetail.requesterZipCode}
            />
          ))}
        </section>

        {proposalDetail && (
          <>
            <img src={BlurImg} alt="landing blur" className="fixed bottom-0 left-0 z-10 w-screen" />
            <section className="fixed bottom-[30px] left-1/2 z-20 flex w-73 translate-x-[-50%] gap-6">
              <button
                type="button"
                className="body-m secondary-btn h-10 flex-1 basis-1/2"
                onClick={() => handleProposalApproval('reject')}
              >
                거부하기
              </button>

              <button
                type="button"
                className="primary-btn body-m h-10 flex-1 basis-1/2"
                onClick={() => handleProposalApproval('approve')}
              >
                승인하기
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default ShareApprovalPage;
