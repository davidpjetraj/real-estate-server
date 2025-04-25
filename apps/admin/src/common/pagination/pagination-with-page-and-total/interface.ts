export interface IPageInfo {
  pages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPaginationWithPages<T> {
  data: T[];
  total: number;
  pageInfo: IPageInfo;
}
