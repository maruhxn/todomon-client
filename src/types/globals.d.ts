export interface PageItem<T> {
  results: T[];
  pageNumber: number;
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
  totalPage: number;
  totalElements: number;
}
