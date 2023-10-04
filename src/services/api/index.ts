import instance from "@/services/api/base";
import {
  IFetchWeatherData,
  IGeoCoordinates,
  ILatLonParams,
  IWithResponse,
} from "@/services/api/types/model";
import { AxiosResponse } from "axios";
import { getEnvDataWeather, getEnvLatLon } from "@/env";

class WeatherDataApi {
  async getLatLon(city: string): Promise<IGeoCoordinates> {
    const params: ILatLonParams = {
      q: city,
    };

    const response = await instance.get<
      AxiosResponse,
      IWithResponse<IGeoCoordinates[]>
    >(getEnvLatLon(), {
      params,
    });

    const {
      data: [{ lon, lat }],
    } = response;

    return { lon, lat };
  }

  async fetchWeatherData(coords: IGeoCoordinates): Promise<IFetchWeatherData> {
    try {
      const params: IGeoCoordinates = {
        lat: coords.lat,
        lon: coords.lon,
      };

      const response = await instance.get<
        AxiosResponse,
        IWithResponse<IFetchWeatherData>
      >(getEnvDataWeather(), {
        params,
      });

      const { data } = response;

      return data;
    } catch (e: any) {
      throw Error(e);
    }
  }

  private _getPosition = async (): Promise<GeolocationPosition> => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  public getNativeLocation = async (): Promise<IGeoCoordinates | undefined> => {
    if (navigator.geolocation) {
      const position = await this._getPosition();

      return { lat: position.coords.latitude, lon: position.coords.longitude };
    }
  };
}

export default new WeatherDataApi();
