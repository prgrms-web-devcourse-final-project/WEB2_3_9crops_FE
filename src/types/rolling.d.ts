interface RollingPaperInformation {
  eventPostId: number;
  title: string;
}

interface AdminRollingPaperInformation extends RollingPaperInformation {
  used: boolean;
}

interface RollingPaperComment {
  commentId: number;
  zipCode: string;
  content: string;
}

interface RollingPaper extends RollingPaperInformation {
  eventPostComments: {
    content: RollingPaperComment[];
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

interface PaginationData<T> {
  content: T[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

type RollingPaperList = PaginationData<AdminRollingPaperInformation>;
