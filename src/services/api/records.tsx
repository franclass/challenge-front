import { customAxios } from "../axios";
import { IOperationInput, IRecordQuery } from "@interfaces/general.interfaces";

export const getRecords = async ({offset, filter}:IRecordQuery ) => {
  const response = await customAxios("application/json").get(`/records/${offset}/${filter}`, {});
  return response.data;
};

export const deleteRecord = async (id: string) => {
  const response = await customAxios("application/json").put(`/records/${id}`);
  return response.data;
};

export const createRecord = async ({ _id, amount_a, amount_b }: IOperationInput) => {
  const newRoom = await customAxios("application/json").post(`/records`, {
    _id,
    amount_a,
    amount_b
  });


  return newRoom.data;
};


