import { AxiosResponse } from "axios";
import { api } from "../api";
import { REGISTER_API } from "../constants";
import { RegistrationData } from "../types";

export const registerUser = async (
  body: RegistrationData
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) =>
    api
      .post(REGISTER_API, body)
      .then(resolve)
      .catch(reject)
  );
};
