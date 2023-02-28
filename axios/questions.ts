import { IGenericApiResponse } from "@/interfaces/generic";
import { IQuestion, IQuestionQueryParams } from "@/interfaces/question";
import { number } from "joi";
import { api } from "./init";

const QUESTIONBASE_URL = "/questions";

export const getQuestionsByQuery = async (
  queryObj: IQuestionQueryParams
): Promise<{ data: IQuestion[]; total?: number }> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    QUESTIONBASE_URL,
    {
      params: { ...queryObj, filter: "!nOedRLhSc)" },
    }
  );

  return { data: response.data.items, total: response.data.total };
};

export const getQuestionById = async (
  questionId: number
): Promise<IQuestion> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    `${QUESTIONBASE_URL}/${questionId}`
  );

  return response.data.items[0];
};
