export interface PageItem<T> {
  results: T[];
  pageNumber: number;
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
  totalPage: number;
  totalElements: number;
}

// Server Action + useFormState 사용 시 반환타입
export interface ErrorState {
  error: {
    statusCode: number;
    message: string;
  };
}
