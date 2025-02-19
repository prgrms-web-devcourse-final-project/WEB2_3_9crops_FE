import BgItem from '@/assets/images/field-4.png';

const BackgroundBottom = () => {
  return (
    <div
      className="fixed bottom-[-40px] left-1/2 z-[-10] h-42 w-full -translate-x-1/2 bg-[image:var(--bg-image)] bg-[length:100%_100%] bg-center opacity-70"
      style={{ '--bg-image': `url(${BgItem})` } as React.CSSProperties}
    />
  );
};

export default BackgroundBottom;
