import axios, { AxiosError } from "axios";
import { getEnvApiKey, getEnvWeatherOpenApi } from "@/env";

const instance = axios.create({
  baseURL: getEnvWeatherOpenApi(),
});

instance.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["appid"] = getEnvApiKey();
  config.params["units"] = "metric";
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error?.response) {
      const { data, status } = error.response;
      switch (status) {
        case 400:
          console.error(data);
          break;

        case 401:
          console.error("unauthorised");
          break;

        case 404:
          console.error("/not-found");
          break;

        case 500:
          console.error("/server-error");
          break;
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
