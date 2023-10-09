import { api } from "../api";
import { GET_USER_API } from "../constants";

export const getUserByToken = async (access_token: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    api
      .get(GET_USER_API, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(resolve)
      .catch(reject)
  );
};
