import { coreAxios } from "../axios";

import { ILogin } from "interfaces/login.interface";

export const getToken = async ({ email, password }: ILogin) => {
  const response =  await coreAxios("application/json").post("/auth/login", {
    email,
    password,
  });
  return response.data
};
