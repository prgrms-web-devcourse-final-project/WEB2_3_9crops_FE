import { useIncomingLettersStore } from '@/stores/incomingLettersStore';

//TODO: 내 편지함 상세 조회에서 해당 편지를 조회하면 arrivedCount가 1 감소하도록
const NewLetterModal = () => {
  const { arrivedCount } = useIncomingLettersStore();

  return (
    <p className="text-gray-60 body-b absolute top-30 mb-10 w-fit animate-pulse rounded-full bg-white px-6 py-4">
      {arrivedCount}통의 편지가 도착했어요!
    </p>
  );
};

export default NewLetterModal;
