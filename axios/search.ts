import { IGenericApiResponse, IGenericData } from "@/interfaces/generic";
import { IQuestion } from "@/interfaces/question";
import {
  IAdvancedSearchQueryParams,
  ISearchQueryParams,
} from "@/interfaces/search";
import { api } from "./init";

const SEARCH_URL = "/search";

export const searchByQuery = async (
  queryObj: ISearchQueryParams
): Promise<IGenericData<IQuestion>> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(SEARCH_URL, {
    params: queryObj,
  });

  return { data: response.data.items, has_more: response.data.has_more };
};

export const advancedSearchByQuery = async (
  queryObj: IAdvancedSearchQueryParams
): Promise<IGenericData<IQuestion>> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    `${SEARCH_URL}/advanced`,
    {
      params: queryObj,
    }
  );

  return { data: response.data.items, has_more: response.data.has_more };
};
