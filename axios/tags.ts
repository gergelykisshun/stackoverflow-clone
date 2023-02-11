import { api } from "./init";

const TAGSBASE_URL = "/tags";

export const getAllTags = async () => {
  const response = await api.get(TAGSBASE_URL);
  console.log("TAGS", response.data);
  return response.data;
};
