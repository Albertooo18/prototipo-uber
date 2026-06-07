export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type ApiError = {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  meta: PaginationMeta;
};
