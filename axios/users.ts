import { IGenericApiResponse } from "@/interfaces/generic";
import { ITag } from "@/interfaces/tags";
import { IUser } from "@/interfaces/users";
import { api } from "./init";

const USERSBASE_URL = "/users";

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await api.get<IGenericApiResponse<IUser>>(USERSBASE_URL);
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

export const getUserTagsByUserId = async (userId: number): Promise<ITag[]> => {
  const response = await api.get<IGenericApiResponse<ITag>>(
    `${USERSBASE_URL}/${userId}/tags`,
    { params: { pagesize: 5 } }
  );

  return response.data.items;
};
