interface RandomLetters {
  letterId: number;
  title: string;
  zipCode: string;
  category: Category;
  paperType: PaperType;
  fontType: FontType;
  createdAt: Date;
}

interface MatchedLetter extends RandomLetters {
  replyDeadLine: Date;
  temporary: boolean;
}

interface CoolTime {
  lastMatchedAt: Date;
}

interface CoolTimeData extends CoolTime {
  canSend: boolean;
}
