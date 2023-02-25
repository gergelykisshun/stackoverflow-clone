import { IGenericApiQuery } from "./generic";

export interface ISearchQueryParams extends IGenericApiQuery {
  sort?: "activity" | "votes" | "creation" | "relevance";

  intitle?: string;
  tagged?: string;
  nottagged?: string;
}

export interface IAdvancedSearchQueryParams extends IGenericApiQuery {}
