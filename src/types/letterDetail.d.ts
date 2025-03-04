interface LetterDetail {
  letterId: number;
  title: string;
  content: string;
  category: 'CONSOLATION' | 'CELEBRATION' | 'CONSULT' | 'ETC';
  paperType: PaperType;
  fontType: FontType;
  matched: boolean;
  evaluated: boolean;
  matchingId: number;
  zipCode: string;
}
