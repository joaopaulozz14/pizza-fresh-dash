import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { Auth } from "../Auth";
import { LocalStorageHelper } from "../LocalStorageHelper";
import { ApiError, NetworkError } from "./errors";

type args = [input: RequestInfo, init?: RequestInit | undefined];

function requestInterceptor(config: RequestInit | undefined) {
  if (config) {
    const token = {
      Authorization: `Bearer ${LocalStorageHelper.get(LocalStorageKeys.TOKEN)}`,
    };
    config.headers = { ...config.headers, ...token };
  }
}

function responseInterceptor(res: Response) {
  if (res.status === 401) Auth.logout();
}

export const Api = async (...args: args): Promise<Response> => {
  let [url, config] = args;
  requestInterceptor(config);
  try {
    const response = await fetch(url, config);
    responseInterceptor(response);
    console.log(response);
    if (!response.ok) {
      throw new ApiError(`HTTP error:`);
    }
    return response;
  } catch (error) {
    throw new NetworkError(`Network error ${error}`);
  }
};
