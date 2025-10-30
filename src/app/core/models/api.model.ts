export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: PaginationInfo;
  success: boolean;
  message?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: any;
}

