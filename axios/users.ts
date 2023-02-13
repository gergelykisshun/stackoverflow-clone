import { IUser, IUserApiResponse } from "@/interfaces/users";
import { api } from "./init";

const USERSBASE_URL = "/users";

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await api.get<IUserApiResponse>(USERSBASE_URL);
  return response.data.items;
};
