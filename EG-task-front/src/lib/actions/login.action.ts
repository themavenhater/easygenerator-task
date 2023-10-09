import { AxiosResponse } from "axios";
import { LOGIN_API } from "../constants";
import { LoginData } from "../types";
import { api } from "../api";

export const loginUser = async (body: LoginData): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) =>
    api.post(LOGIN_API, body).then(resolve).catch(reject)
  );
};
