interface RandomLetters {
  letterId: number;
  title: string;
  zipCode: string;
  category: Category;
  writerId: number;
  createdAt: Date;
}

interface MatchedLetter extends RandomLetters {
  paperType: PaperType;
  fontType: FontType;
  content: string;
  replyDeadLine: Date;
  temporary: boolean;
}

interface CoolTime {
  lastMatchedAt: Date;
}

interface CoolTimeData extends CoolTime {
  canSend: boolean;
}

interface ApproveRequest {
  letterId: string;
  writerId: string;
}
