import { IAnswer } from "@/interfaces/answer";
import { IGenericApiResponse, IGenericData } from "@/interfaces/generic";
import { IQuestion } from "@/interfaces/question";
import { ITag } from "@/interfaces/tags";
import { IUser, IUserQueryParams } from "@/interfaces/users";
import { api } from "./init";

const USERSBASE_URL = "/users";

export const getUsersByQuery = async (
  queryObj: IUserQueryParams
): Promise<IGenericData<IUser>> => {
  const response = await api.get<IGenericApiResponse<IUser>>(USERSBASE_URL, {
    params: queryObj,
  });

  return { data: response.data.items, has_more: response.data.has_more };
};

export const getUserById = async (userId: number): Promise<IUser> => {
  const response = await api.get<IGenericApiResponse<IUser>>(
    `${USERSBASE_URL}/${userId}`
  );
  if (response.data.items.length > 0) {
    return response.data.items[0];
  }
  throw new Error("User not found");
};

export const getUserTagsByUserId = async (
  userId: number,
  pagesize: number = 10
): Promise<ITag[]> => {
  const response = await api.get<IGenericApiResponse<ITag>>(
    `${USERSBASE_URL}/${userId}/tags`,
    { params: { pagesize } }
  );

  return response.data.items;
};

export const getAnswersByUserId = async (
  userId: number,
  pagesize: number = 10
): Promise<IAnswer[]> => {
  const response = await api.get<IGenericApiResponse<IAnswer>>(
    `${USERSBASE_URL}/${userId}/answers`,
    { params: { pagesize, sort: "votes" } }
  );

  return response.data.items;
};

export const getQuestionsByUserId = async (
  userId: number,
  pagesize: number = 10
): Promise<IQuestion[]> => {
  const response = await api.get<IGenericApiResponse<IQuestion>>(
    `${USERSBASE_URL}/${userId}/questions`,
    { params: { pagesize, sort: "votes" } }
  );

  return response.data.items;
};
