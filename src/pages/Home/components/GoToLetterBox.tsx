import { Link } from 'react-router';

const GoToLetterBox = () => {
  //TODO : hasNewLetters 전역으로 상태 관리하기
  let hasNewLetters = true;
  return (
    <div className="absolute bottom-10 left-5 z-30 flex w-fit">
      <div className="text-left">
        <p className="text-gray-60 body-r mb-1 ml-2">내 편지함</p>
        <Link to="/letter/box">
          <img
            src={
              hasNewLetters
                ? 'src/assets/go_to_letter_box_new_letters.png'
                : '/src/assets/go_to_letter_box.png'
            }
            alt="go to letter box"
            className="w-[206.5px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default GoToLetterBox;
