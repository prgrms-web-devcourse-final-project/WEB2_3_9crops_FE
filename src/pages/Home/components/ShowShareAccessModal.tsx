import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getShareProposalList } from '@/apis/share';
import { ShareProposal } from '@/apis/share';

import { getShareProposalDetail } from '@/apis/share';

import ModalBackgroundWrapper from '@/components/ModalBackgroundWrapper';
import ModalOverlay from '@/components/ModalOverlay';

interface ShowShareAccessModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const ShowShareAccessModal = ({ onClose }: ShowShareAccessModalProps) => {
  const navigate = useNavigate();

  const [shareProposals, setShareProposals] = useState<ShareProposal[]>([]);

  useEffect(() => {
    getShareProposalList()
      .then((data) => {
        setShareProposals(data || []);
      })
      .catch((error) => {
        console.error('❌ 공유 요청 목록을 불러오는 데 실패했습니다.', error);
      });
  }, []);

  const handleNavigation = async (shareProposalId: number) => {
    try {
      const proposalDetail = await getShareProposalDetail(shareProposalId);
      navigate(`/board/share/${shareProposalId}`, {
        state: { proposalDetail },
      });
    } catch (error) {
      console.error('❌ 게시글 상세 페이지로 이동하는 데에 실패했습니다.', error);
    }
  };

  return (
    <ModalOverlay closeOnOutsideClick onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="body-sb mb-4 h-fit max-w-[170px] text-center text-white">
          공유 요청이 왔어요!
        </p>
        <div className="flex w-73 justify-center">
          <ModalBackgroundWrapper className="relative overflow-hidden rounded-lg p-5">
            <div className="flex flex-col gap-1">
              <p className="body-sb text-gray-80">게시판 공유 승인하기</p>
              <p className="caption-r text-black">
                따숨님과 주고받은 추억을 게시판에 공유하고 싶으신 분이 있어요. 클릭해서 확인하고,
                허락 여부를 체크해주세요!
              </p>
            </div>
            <div className="mt-6 flex max-h-60 min-h-auto w-[251px] flex-col gap-[10px] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
              {shareProposals.length > 0 ? (
                shareProposals.map((proposal) => (
                  <button
                    className="text-gray-80 body-m flex h-10 w-full items-center justify-between gap-1 rounded-lg bg-white p-3"
                    key={proposal.shareProposalId}
                    onClick={() => handleNavigation(proposal.shareProposalId)}
                    aria-label="따숨님의 공유 요청"
                  >
                    <p>{proposal.requesterZipCode}님의 공유 요청</p>
                  </button>
                ))
              ) : (
                <p className="caption-m text-center text-gray-50">새로운 공유 요청이 없어요</p>
              )}
            </div>
          </ModalBackgroundWrapper>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ShowShareAccessModal;
