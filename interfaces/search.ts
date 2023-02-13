export interface ISearchQueryParams {
  page?: number;
  pageSize?: number;

  todate?: number;
  fromdate?: number;

  max?: number;
  min?: number;

  order: "desc" | "asc";
  sort: "activity" | "votes" | "creation" | "relevance";

  intitle: string;
  tagged: string;
  nottagged?: string;
}
