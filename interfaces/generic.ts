export interface IGenericApiResponse<T> {
  backoff?: number;
  error_id?: number;
  error_message?: string;
  error_name?: string;
  has_more: boolean;
  items: T[];
  quota_max: number;
  quota_remaining: number;
  total?: number;
}

export interface IGenericApiQuery {
  page?: number;
  pagesize?: number;

  todate?: number;
  fromdate?: number;

  max?: number;
  min?: number;

  order?: "desc" | "asc";
}

export interface IGenericData<T> {
  data: T[];
  has_more: boolean;
}
