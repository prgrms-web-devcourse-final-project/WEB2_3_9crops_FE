import BgItem from '@/assets/images/field-4.png';

const BackgroundBottom = () => {
  return (
    <div
      className="background-image-filled fixed bottom-[-40px] left-1/2 z-[-10] h-42 w-full -translate-x-1/2 opacity-70"
      style={{ '--bg-image': `url(${BgItem})` } as React.CSSProperties}
    />
  );
};

export default BackgroundBottom;
