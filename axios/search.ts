import { IQuestion, IQuestionApiResponse } from "@/interfaces/question";
import { ISearchQueryParams } from "@/interfaces/search";
import { api } from "./init";

const SEARCH_URL = "/search";

export const searchByQueries = async (
  queryObj: ISearchQueryParams
): Promise<IQuestion[]> => {
  const response = await api.get<IQuestionApiResponse>(SEARCH_URL, {
    params: queryObj,
  });

  return response.data.items;
};
