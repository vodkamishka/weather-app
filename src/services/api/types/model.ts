import { AxiosRequestConfig } from "axios";

export interface IWithResponse<T> {
  status: "success" | "error" | "fail";
  statusText: string;
  data: T;
}

export interface IGeoCoordinates {
  lat: number;
  lon: number;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

type CoordsType = "lon" | "lat";

export interface IFetchWeatherData {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: Record<CoordsType, number>;
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export interface IWeatherLocation {
  location: string;
  country: string;
  temperature: number;
  visibility: number;
  description: string;
  speed: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  id: string;
  icon: string;
}

export interface ILatLonParams extends AxiosRequestConfig {
  q: string;
}
