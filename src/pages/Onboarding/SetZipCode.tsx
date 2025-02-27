import { useEffect, useState } from 'react';

import { getZipCode } from '@/apis/auth';
import useAuthStore from '@/stores/authStore';

import Spinner from './components/Spinner';

const SetZipCode = ({
  setIsZipCodeSet,
}: {
  setIsZipCodeSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [zipCode, setZipCode] = useState<string>('');
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const { accessToken } = useAuthStore.getState();

  const fetchZipCode = async () => {
    try {
      const response = await getZipCode(accessToken as string);
      if (!response) throw new Error('fetchZipCode: no response');
      console.log(response.data.zipCode);
      setZipCode(response.data.zipCode);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchZipCode();
    setTimeout(() => {
      setIsBtnActive(true);
    }, 6300);
  }, []);
  return (
    <>
      <header className="flex flex-col items-center">
        <h1 className="message-header body-b mb-2">우편번호를 설정하고 있습니다.</h1>
        <p className="caption-sb text-gray-60">우편번호란?</p>
        <p className="caption-sb text-gray-60">사용자님이 편지를 주고 받는 주소입니다.</p>
      </header>
      <section className="flex gap-2">
        {zipCode.split('').map((char, index) => (
          <Spinner key={index} target={char} index={index}></Spinner>
        ))}
      </section>
      <button
        type="button"
        disabled={!isBtnActive}
        className="primary-btn body-m w-full py-2"
        onClick={() => {
          setIsZipCodeSet(true);
        }}
      >
        다음으로
      </button>
    </>
  );
};

export default SetZipCode;
