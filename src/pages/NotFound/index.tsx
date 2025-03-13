import { useNavigate } from 'react-router';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <main className="absolute inset-0 flex h-full w-full flex-col justify-end bg-white px-5 pt-7.5 pb-4">
      <article className="basic-theme mt-7.5 mb-9 grow text-center">
        <h1 className="h3-b font-malang mt-15.5">존재하지 않는 페이지</h1>
        <section className="mt-23.5" style={{ fontFamily: 'KyoboHandwriting2020A' }}>
          <p>존재한다는 건 정말 소중한 일이에요.</p>
          <p>누군가에게 발견될 수 있으니 말이죠.</p>
          <p>마치 36.5를 통해 연결된 따숨님들처럼요.</p>
          <br />
          <p>36.5 에 존재하는 다른 페이지들이 많아요!</p>
          <p>여러분을 기다리고 있는 다른 페이지들을 발견해주시겠어요?</p>
        </section>
        <p className="font-malang mt-23.5">From.9황작물</p>
      </article>
      <button
        className="primary-btn body-sb text-gray-60 h-fit w-full py-2"
        onClick={() => {
          navigate(`/`);
        }}
        aria-label="집으로 돌아가기"
      >
        집으로 돌아가기
      </button>
    </main>
  );
}
