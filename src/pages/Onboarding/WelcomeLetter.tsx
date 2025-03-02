import { useNavigate } from 'react-router';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <main className="animate-fadeIn absolute inset-0 flex h-full w-full flex-col justify-end bg-white px-5 pt-7.5 pb-4 opacity-0">
      <article className="basic-theme mt-7.5 mb-9 grow pl-4">
        <h1 className="font-malang mt-15">To.따숨이</h1>
        <h2 className="font-malang">환영합니다! 우리 함께 마음을 나누어 보아요</h2>
        <section className="mt-9" style={{ fontFamily: 'KyoboHandwriting2020A' }}>
          <p>안녕하세요, 따숨이님!</p>
          <br />
          <p>요즘 어떤 말을 하고싶으신가요?</p>
          <p>36.5에서 따뜻한 마음의 편지를 나누어 보세요.</p>
          <br />
          <p>따뜻한 편지 문화를 위해 아래의 안내 사항을 숙지해주세요!</p>
          <p>1. 욕설, 비방, 성희롱은 금지입니다.</p>
          <p>
            2. 만약 위의 이유로 신고를 당할 경우 경고를 받게 되고, 세번의 경고를 받게 되면 서비스를
            이용하실 수 없습니다.
          </p>
          <p>3. 고민 편지에 대한 답장은 검수 후에 전달됩니다.</p>
        </section>
        <p className="font-malang mt-22">From.9황작물</p>
      </article>
      <button
        className="primary-btn body-sb text-gray-60 h-fit w-full py-2"
        onClick={() => {
          navigate(`/`);
          sessionStorage.removeItem('onBoarding');
        }}
      >
        홈으로 가기
      </button>
    </main>
  );
}
