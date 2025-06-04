import { useEffect, useState } from 'react';

function checkWebpSupport() {
  return new Promise((resolve) => {
    const webp = new Image();
    // 이미지 로드에 따른 이벤트핸들러 부여
    webp.onload = () => resolve(webp.width > 0 && webp.height > 0);
    webp.onerror = () => resolve(false);
    // 이미지 로드 시도
    webp.src =
      'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}

export default function WebpImage({
  src,
  alt = '',
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    checkWebpSupport().then((isSupported) => {
      console.log(isSupported);
      setImageSrc(isSupported ? src : src.replace(/\.\w+$/, '.png'));
    });
  }, [src]);

  return <img src={imageSrc} alt={alt} className={className} />;
}
