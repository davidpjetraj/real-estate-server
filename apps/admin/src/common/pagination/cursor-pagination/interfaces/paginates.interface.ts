export interface IEdge<T> {
  cursor: string;
  node: T;
}

export interface IBasicPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface ICursorPageInfo extends IBasicPageInfo {
  startCursor: string;
  hasPreviousPage: boolean;
}

export interface IBasicPaginated<T> {
  edges: IEdge<T>[];
  pageInfo: IBasicPageInfo;
}

export interface ICursorPagination<T> {
  edges: IEdge<T>[];
  pageInfo: ICursorPageInfo;
}
