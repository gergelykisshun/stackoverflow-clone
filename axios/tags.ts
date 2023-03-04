import { IGenericApiResponse, IGenericData } from "@/interfaces/generic";
import { ITag, ITagQueryParams } from "@/interfaces/tags";
import { api } from "./init";

const TAGSBASE_URL = "/tags";

export const getTagsByQuery = async (
  queryObj: ITagQueryParams
): Promise<IGenericData<ITag>> => {
  const response = await api.get<IGenericApiResponse<ITag>>(TAGSBASE_URL, {
    params: queryObj,
  });

  return { data: response.data.items, has_more: response.data.has_more };
};
