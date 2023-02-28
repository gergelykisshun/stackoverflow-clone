import { IGenericApiQuery } from "./generic";

export interface ISearchQueryParams extends IGenericApiQuery {
  sort?: "activity" | "votes" | "creation" | "relevance";

  intitle?: string;
  tagged?: string;
  nottagged?: string;
}

export interface IAdvancedSearchQueryParams extends IGenericApiQuery {
  sort?: "activity" | "votes" | "creation" | "relevance";
  q?: string;

  accepted?: boolean;
  closed?: boolean;

  answers?: number;

  body?: string;
  title?: string;
  tagged?: string;
}
