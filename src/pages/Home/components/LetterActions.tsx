import { useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ShowIncomingLettersModal from './ShowIncomingLettersModal';
import ShowDraftModal from './ShowDraftModal';
import ShowShareAccessModal from './ShowShareAccessModal';

const LetterActions = () => {
  const [activeModal, setActiveModal] = useState<
    null | 'incomingLetters' | 'draft' | 'shareAccess'
  >(null);

  return (
    <div className="absolute top-24 right-5 z-31 mt-3 flex justify-end">
      <div className="flex flex-col gap-y-3">
        <button
          onClick={() => {
            setActiveModal('incomingLetters');
          }}
          className="flex h-12 w-12 items-center justify-center gap-[10px] rounded-full bg-white/40 text-gray-50 shadow-[inset_0_-2px_2px_0_rgba(208,169,14,0.30),_0_0px_4px_0_rgba(199,164,29,0.30)]"
        >
          <SendOutlinedIcon />
        </button>
        <button
          onClick={() => setActiveModal('draft')}
          className="flex h-12 w-12 items-center justify-center gap-[10px] rounded-full bg-white/40 text-gray-50 shadow-[inset_0_-2px_2px_0_rgba(208,169,14,0.30),_0_0px_4px_0_rgba(199,164,29,0.30)]"
        >
          <DriveFileRenameOutlineOutlinedIcon />
        </button>
        <button
          onClick={() => setActiveModal('shareAccess')}
          className="flex h-12 w-12 items-center justify-center gap-[10px] rounded-full bg-white/40 text-gray-50 shadow-[inset_0_-2px_2px_0_rgba(208,169,14,0.30),_0_0px_4px_0_rgba(199,164,29,0.30)]"
        >
          <ShareOutlinedIcon />
        </button>
      </div>
      {activeModal === 'incomingLetters' && (
        <ShowIncomingLettersModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'draft' && <ShowDraftModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'shareAccess' && (
        <ShowShareAccessModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};

export default LetterActions;
