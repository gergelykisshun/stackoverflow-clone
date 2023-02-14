import { IGenericApiResponse } from "@/interfaces/generic";
import { IQuestion } from "@/interfaces/question";
import { ISearchQueryParams } from "@/interfaces/search";
import { api } from "./init";

const SEARCH_URL = "/search";

export const searchByQueries = async (
  queryObj: ISearchQueryParams
): Promise<IQuestion[]> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(SEARCH_URL, {
    params: queryObj,
  });

  return response.data.items;
};
