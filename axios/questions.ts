import { IGenericApiResponse, IGenericData } from "@/interfaces/generic";
import { IQuestion, IQuestionQueryParams } from "@/interfaces/question";
import { api } from "./init";

const QUESTIONBASE_URL = "/questions";

export const getQuestionsByQuery = async (
  queryObj: IQuestionQueryParams
): Promise<IGenericData<IQuestion>> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    QUESTIONBASE_URL,
    {
      params: queryObj,
    }
  );

  return { data: response.data.items, has_more: response.data.has_more };
};

export const getQuestionById = async (
  questionId: number
): Promise<IQuestion> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    `${QUESTIONBASE_URL}/${questionId}`
  );

  return response.data.items[0];
};
