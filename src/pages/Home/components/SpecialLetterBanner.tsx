import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

const SpecialLetterBanner = () => {
  const DUMMY_SPECIAL_LETTER_BANNER =
    '11월 15일은 수능! 고생하는 수험생들을 위해 응원의 편지를 적어주세요!';

  return (
    <div className="absolute top-[55px] flex w-full max-w-[600px] justify-center">
      <div className="body-sb text-gray-60 flex w-[80vw] items-center gap-[10px] overflow-hidden rounded-lg border border-[#F7E7A9] bg-gradient-to-r from-white/40 via-[#EEEEEE]/40 to-[#EEEEEE]/40 px-2 py-2 shadow-md">
        <div className="flex items-center justify-center">
          <CampaignOutlinedIcon />
        </div>
        <div className="flex-1 overflow-hidden">
          <span className="animate-marquee block whitespace-nowrap">
            {DUMMY_SPECIAL_LETTER_BANNER}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpecialLetterBanner;
