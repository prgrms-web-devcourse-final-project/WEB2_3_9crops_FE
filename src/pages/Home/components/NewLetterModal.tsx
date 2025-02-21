// import { useState } from 'react';

const NewLetterModal = () => {
  // const [newLetterCount, setNewLetterCount] = useState(0);
  const newLetterCount = 3;

  return (
    <p className="text-gray-60 body-b absolute top-30 mb-10 w-fit animate-pulse rounded-full bg-white px-6 py-4">
      {newLetterCount}통의 편지가 도착했어요!
    </p>
  );
};

export default NewLetterModal;
