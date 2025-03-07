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

interface PaginationData<T> {
  content: T[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface RollingPaperList extends PaginationData<AdminRollingPaperInformation> {}

interface RollingPaper extends RollingPaperInformation {
  eventPostComments: PaginationData<RollingPaperComment>;
}
