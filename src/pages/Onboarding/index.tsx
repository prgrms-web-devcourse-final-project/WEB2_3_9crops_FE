import { useState } from 'react';
import SetZipCode from './SetZipCode';
import UserInteraction from './UserInteraction';

const OnboardingPage = () => {
  const [isZipCodeSet, setIsZipCodeSet] = useState<Boolean>(false);

  return (
    <main className="mx-5 mt-20 mb-[1.875rem] flex grow flex-col items-center justify-between">
      {isZipCodeSet === false ? (
        <SetZipCode setIsZipCodeSet={setIsZipCodeSet} />
      ) : (
        <UserInteraction />
      )}
    </main>
  );
};

export default OnboardingPage;
