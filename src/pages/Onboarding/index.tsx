import { useEffect, useState } from 'react';

import SetZipCode from './SetZipCode';
import UserInteraction from './UserInteraction';
import WelcomeLetter from './WelcomeLetter';

const OnboardingPage = () => {
  const [isZipCodeSet, setIsZipCodeSet] = useState<boolean>(false);
  const [isAnimationOver, setIsAnimationOver] = useState<boolean>(false);

  useEffect(() => {
    if (isZipCodeSet || isAnimationOver) {
      sessionStorage.setItem(
        'onBoarding',
        JSON.stringify({ isZipCodeSet: isZipCodeSet, isAnimationOver: isAnimationOver }),
      );
    }
  }, [isZipCodeSet, isAnimationOver]);

  useEffect(() => {
    const prevDataString = sessionStorage.getItem('onBoarding');
    if (prevDataString) {
      const newData = JSON.parse(prevDataString);
      console.log(newData);
      setIsZipCodeSet(newData.isZipCodeSet);
      setIsAnimationOver(newData.isAnimationOver);
      console.log('isZipCode', isZipCodeSet, 'isAnimation', isAnimationOver);
    }
  }, []);
  return (
    <main className="inset-0 mx-5 mt-20 mb-[1.875rem] flex grow flex-col items-center justify-between overflow-hidden">
      {!isZipCodeSet ? (
        <SetZipCode setIsZipCodeSet={setIsZipCodeSet} />
      ) : !isAnimationOver ? (
        <UserInteraction setIsAnimationOver={setIsAnimationOver} />
      ) : (
        <WelcomeLetter />
      )}
    </main>
  );
};

export default OnboardingPage;
