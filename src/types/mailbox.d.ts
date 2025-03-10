interface LetterBoxData {
  letterMatchingId: number;
  oppositeZipCode: string;
  active: boolean;
  oppositeRead: boolean;
  letterCount: number;
  oppositeId: number;
}

interface LetterBoxItemProps {
  boxId: number;
  zipCode: string;
  letterCount: number;
  isChecked?: boolean;
  isClosed?: boolean;
  oppositeId: number;
}
