import { IGenericApiResponse } from "@/interfaces/generic";
import { ITag } from "@/interfaces/tags";
import { IUser, IUserQueryParams } from "@/interfaces/users";
import { api } from "./init";

const USERSBASE_URL = "/users";

export const getUsersByQuery = async (
  queryObj: IUserQueryParams
): Promise<IUser[]> => {
  const response = await api.get<IGenericApiResponse<IUser>>(USERSBASE_URL, {
    params: queryObj,
  });

  return response.data.items;
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

  console.log("BACKOFF RECIEVED!!!", response.data.backoff);

  return response.data.items;
};
