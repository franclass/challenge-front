import { customAxios } from "../axios";


export const getOperations = async () => {
  const response = await customAxios("application/json").get("/operations", {});
  return response.data;
};
