import { IGenericApiResponse } from "@/interfaces/generic";
import { IQuestion, IQuestionQueryParams } from "@/interfaces/question";
import { api } from "./init";

const QUESTIONBASE_URL = "/questions";

export const getQuestionsByQuery = async (
  queryObj: IQuestionQueryParams
): Promise<IQuestion[]> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    QUESTIONBASE_URL,
    {
      params: queryObj,
    }
  );

  return response.data.items;
};
