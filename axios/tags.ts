import { IGenericApiResponse } from "@/interfaces/generic";
import { ITag } from "@/interfaces/tags";
import { api } from "./init";

const TAGSBASE_URL = "/tags";

export const getAllTags = async (): Promise<ITag[]> => {
  const response = await api.get<IGenericApiResponse<ITag>>(TAGSBASE_URL);
  return response.data.items;
};
