import { useState } from 'react';

import useWrite from '@/stores/writeStore';

function CategoryStamp({ title, image }: { title: Stamp; image: string }) {
  const [hovered, setHovered] = useState(false);

  const stamp = useWrite((state) => state.stamp);
  const setStamp = useWrite((state) => state.setStamp);

  return (
    <div className="flex w-full cursor-pointer flex-col items-center justify-center">
      <svg
        height="80%"
        viewBox="0 0 138 170"
        fill="none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setStamp(title)}
      >
        <image href={image} width="125" height="150" x={5} y={5}></image>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.303 4.27673C131.675 4.27673 133.598 2.36197 133.598 2.22916e-08L137.894 0V5.34591C135.521 5.34591 133.598 7.26067 133.598 9.62264C133.598 11.9846 135.521 13.8994 137.894 13.8994V20.3145C135.521 20.3145 133.598 22.2292 133.598 24.5912C133.598 26.9532 135.521 28.8679 137.894 28.8679V35.283C135.521 35.283 133.598 37.1978 133.598 39.5597C133.598 41.9217 135.521 43.8365 137.894 43.8365V50.2516C135.521 50.2516 133.598 52.1663 133.598 54.5283C133.598 56.8903 135.521 58.805 137.894 58.805V65.2201C135.521 65.2201 133.598 67.1349 133.598 69.4969C133.598 71.8588 135.521 73.7736 137.894 73.7736V80.1887C135.521 80.1887 133.598 82.1034 133.598 84.4654C133.598 86.8274 135.521 88.7421 137.894 88.7421V95.1572C135.521 95.1572 133.598 97.072 133.598 99.434C133.598 101.796 135.521 103.711 137.894 103.711V110.126C135.521 110.126 133.598 112.041 133.598 114.403C133.598 116.764 135.521 118.679 137.894 118.679V125.094C135.521 125.094 133.598 127.009 133.598 129.371C133.598 131.733 135.521 133.648 137.894 133.648V140.063C135.521 140.063 133.598 141.978 133.598 144.34C133.598 146.702 135.521 148.616 137.894 148.616V155.031C135.521 155.031 133.598 156.946 133.598 159.308C133.598 161.67 135.521 163.585 137.894 163.585L137.894 170H133.598C133.598 167.638 131.675 165.723 129.303 165.723C126.931 165.723 125.008 167.638 125.008 170H118.565C118.565 167.638 116.642 165.723 114.27 165.723C111.898 165.723 109.975 167.638 109.975 170H103.532C103.532 167.638 101.609 165.723 99.2367 165.723C96.8645 165.723 94.9415 167.638 94.9415 170H88.4986C88.4986 167.638 86.5756 165.723 84.2034 165.723C81.8312 165.723 79.9082 167.638 79.9082 170H73.4654C73.4654 167.638 71.5424 165.723 69.1702 165.723C66.798 165.723 64.875 167.638 64.875 170H58.4321C58.4321 167.638 56.5091 165.723 54.1369 165.723C51.7648 165.723 49.8417 167.638 49.8417 170H43.3989C43.3989 167.638 41.4759 165.723 39.1037 165.723C36.7315 165.723 34.8085 167.638 34.8085 170H28.3657C28.3657 167.638 26.4426 165.723 24.0704 165.723C21.6983 165.723 19.7752 167.638 19.7752 170H13.3324C13.3324 167.638 11.4094 165.723 9.0372 165.723C6.66502 165.723 4.74199 167.638 4.74199 170H0.446785L0.446777 163.585C2.81896 163.585 4.74199 161.67 4.74199 159.308C4.74199 156.946 2.81896 155.031 0.446777 155.031L0.446777 148.616C2.81896 148.616 4.74199 146.702 4.74199 144.34C4.74199 141.978 2.81896 140.063 0.446777 140.063L0.446777 133.648C2.81896 133.648 4.74199 131.733 4.74199 129.371C4.74199 127.009 2.81896 125.094 0.446779 125.094L0.446779 118.679C2.81896 118.679 4.74199 116.764 4.74199 114.403C4.74199 112.041 2.81896 110.126 0.44678 110.126L0.44678 103.711C2.81896 103.711 4.74199 101.796 4.74199 99.434C4.74199 97.072 2.81896 95.1572 0.44678 95.1572L0.446781 88.7421C2.81896 88.7421 4.74199 86.8274 4.74199 84.4654C4.74199 82.1034 2.81896 80.1887 0.446781 80.1887L0.446781 73.7736C2.81896 73.7736 4.74199 71.8588 4.74199 69.4969C4.74199 67.1349 2.81896 65.2201 0.446782 65.2201L0.446782 58.805C2.81896 58.805 4.74199 56.8903 4.74199 54.5283C4.74199 52.1663 2.81896 50.2516 0.446782 50.2516L0.446783 43.8365C2.81896 43.8365 4.74199 41.9217 4.742 39.5597C4.742 37.1978 2.81896 35.283 0.446782 35.283L0.446783 28.8679C2.81896 28.8679 4.742 26.9532 4.742 24.5912C4.742 22.2292 2.81896 20.3145 0.446783 20.3145L0.446783 13.8994C2.81896 13.8994 4.742 11.9846 4.742 9.62264C4.742 7.26067 2.81896 5.34591 0.446784 5.34591L0.446784 7.1333e-07L4.74199 6.91038e-07C4.74199 2.36197 6.66502 4.27673 9.0372 4.27673C11.4094 4.27673 13.3324 2.36197 13.3324 6.46455e-07L19.7752 6.13018e-07C19.7752 2.36197 21.6983 4.27673 24.0704 4.27673C26.4426 4.27673 28.3657 2.36197 28.3657 5.68435e-07L34.8085 5.34998e-07C34.8085 2.36197 36.7315 4.27673 39.1037 4.27673C41.4759 4.27673 43.3989 2.36197 43.3989 4.90415e-07L49.8417 4.56977e-07C49.8417 2.36197 51.7648 4.27673 54.1369 4.27673C56.5091 4.27673 58.4321 2.36197 58.4321 4.12394e-07L64.875 3.78957e-07C64.875 2.36197 66.798 4.27673 69.1702 4.27673C71.5424 4.27673 73.4654 2.36197 73.4654 3.34373e-07L79.9082 3.00936e-07C79.9082 2.36197 81.8312 4.27673 84.2034 4.27673C86.5756 4.27673 88.4986 2.36197 88.4986 2.56353e-07L94.9415 2.22916e-07C94.9415 2.36197 96.8645 4.27673 99.2367 4.27673C101.609 4.27673 103.532 2.36197 103.532 1.78333e-07L109.975 1.44895e-07C109.975 2.36197 111.898 4.27673 114.27 4.27673C116.642 4.27673 118.565 2.36197 118.565 1.00312e-07L125.008 6.68747e-08C125.008 2.36197 126.931 4.27673 129.303 4.27673ZM119.809 18.0851H18.5324V151.915H119.809V18.0851Z"
          fill={`${stamp === title || hovered ? '#FAB546' : 'white'}`}
        />
      </svg>
    </div>
  );
}

export default CategoryStamp;
