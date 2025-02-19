import ResultLetter from '@/components/ResultLetter';

export default function Matched() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="body-m flex flex-col items-center justify-center">
        <p className="text-gray-60">답장까지 남은 시간</p>
        <p className="text-gray-80">
          {'00'} : {'00'} : {'00'}
        </p>
        <div className="mt-2 w-75">
          <ResultLetter stampName="기타" title="테스트용가리" />
        </div>
        <button
          className="bg-primary-3 body-m mt-12.5 w-full cursor-pointer rounded-lg py-2"
          onClick={() => {}}
        >
          매칭 취소하기
        </button>
      </div>
    </div>
  );
}
