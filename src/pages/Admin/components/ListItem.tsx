import { useState } from 'react';

import { KebobMenuIcon } from '@/assets/icons';

import MenuModal from './MenuModal';

interface DataProps {
  id: string;
  reporterEmail: string;
  targetEmail: string;
  reportedAt: Date;
  reason: string;
}
interface ModalContents {
  title: string;
  onClick: () => void;
}
export default function ListItem({
  data,
  modalContents,
  setDetailModalOpen,
}: {
  data: DataProps;
  modalContents: ModalContents[];
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="hover:bg-primary-4 relative flex justify-between border-b bg-white px-6 py-4">
      <div className="flex w-[80%] items-center" onClick={() => setDetailModalOpen(true)}>
        <span className="ml-4 line-clamp-1 flex basis-1/10">{data.id}</span>
        <span className="ml-4 line-clamp-1 flex basis-2/10">{data.reporterEmail}</span>
        <span className="ml-4 line-clamp-1 flex basis-2/10">{data.targetEmail}</span>
        <span className="ml-4 line-clamp-1 flex basis-2/10">{`${data.reportedAt.getFullYear()}.${data.reportedAt.getMonth()}.${data.reportedAt.getDay()}`}</span>
        <span className="ml-4 line-clamp-1 flex basis-3/10">{data.reason}</span>
      </div>
      <button onClick={() => setModalOpen((cur) => !cur)}>
        <KebobMenuIcon className="h-5 w-5" />
      </button>
      {modalOpen && <MenuModal modalContents={modalContents} setModalOpen={setModalOpen} />}
    </div>
  );
}
