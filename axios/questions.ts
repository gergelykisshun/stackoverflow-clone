import { IGenericApiResponse } from "@/interfaces/generic";
import { IQuestion } from "@/interfaces/question";
import { api } from "./init";

const QUESTIONBASE_URL = "/questions";

export const getAllQuestions = async (): Promise<IQuestion[]> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    QUESTIONBASE_URL
  );

  return response.data.items;
};
