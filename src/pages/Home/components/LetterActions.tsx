import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useState } from 'react';

import ShowDraftModal from './ShowDraftModal';
import ShowIncomingLettersModal from './ShowIncomingLettersModal';
import ShowShareAccessModal from './ShowShareAccessModal';

const LetterActions = () => {
  const [activeModal, setActiveModal] = useState<
    null | 'incomingLetters' | 'draft' | 'shareAccess'
  >(null);

  const arr: { title: 'incomingLetters' | 'draft' | 'shareAccess'; icon: React.ReactNode }[] = [
    {
      title: 'incomingLetters',
      icon: <SendOutlinedIcon />,
    },
    {
      title: 'draft',
      icon: <DriveFileRenameOutlineOutlinedIcon />,
    },
    {
      title: 'shareAccess',
      icon: <ShareOutlinedIcon />,
    },
  ];
  return (
    <>
      <div className="fixed top-24 z-26 mt-3 flex w-full max-w-150 justify-end pr-5">
        <div className="z-42 flex flex-col gap-y-3">
          {arr.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveModal(item.title)}
              className="flex h-12 w-12 items-center justify-center gap-[10px] rounded-full bg-white/40 text-gray-50 shadow-[inset_0_-2px_2px_0_rgba(208,169,14,0.30),_0_0px_4px_0_rgba(199,164,29,0.30)]"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
      {activeModal === 'incomingLetters' && (
        <ShowIncomingLettersModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'draft' && <ShowDraftModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'shareAccess' && (
        <ShowShareAccessModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
};

export default LetterActions;
