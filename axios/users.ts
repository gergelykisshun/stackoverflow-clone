import { api } from "./init";

const USERSBASE_URL = "/users";

export const getAllUsers = async () => {
  const response = await api.get(USERSBASE_URL);
  console.log("USERS", response.data);
  return response.data;
};
