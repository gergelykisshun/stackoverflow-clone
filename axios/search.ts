import { IGenericApiResponse } from "@/interfaces/generic";
import { IQuestion } from "@/interfaces/question";
import {
  IAdvancedSearchQueryParams,
  ISearchQueryParams,
} from "@/interfaces/search";
import { api } from "./init";

const SEARCH_URL = "/search";

export const searchByQuery = async (
  queryObj: ISearchQueryParams
): Promise<IQuestion[]> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(SEARCH_URL, {
    params: queryObj,
  });

  return response.data.items;
};

export const advancedSearchByQuery = async (
  queryObj: IAdvancedSearchQueryParams
): Promise<IQuestion[]> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    `${SEARCH_URL}/advanced`,
    {
      params: queryObj,
    }
  );

  return response.data.items;
};
