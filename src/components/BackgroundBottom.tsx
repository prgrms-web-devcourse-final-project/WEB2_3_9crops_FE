import BgItem from '@/assets/images/field-4.png';

import BackgroundImageWrapper from './BackgroundImageWrapper';

const BackgroundBottom = () => {
  return (
    <BackgroundImageWrapper
      as="div"
      className="fixed bottom-[-40px] left-1/2 h-42 w-full -translate-x-1/2 opacity-70"
      imageUrl={BgItem}
    />
  );
};

export default BackgroundBottom;
