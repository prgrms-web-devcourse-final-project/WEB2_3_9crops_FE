interface RollingPaperInformation {
  eventPostId: number;
  title: string;
}

interface RollingPaperComment {
  commentId: number;
  zipCode: string;
  content: string;
}

interface RollingPaper extends RollingPaperInformation {
  eventPostComments: RollingPaperComment[];
}
