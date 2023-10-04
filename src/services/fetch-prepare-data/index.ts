import WeatherDataApi from "../api";
import LocalStorageService from "../local-storage";
import {
  IFetchWeatherData,
  IGeoCoordinates,
  IWeather,
  IWeatherLocation,
} from "@/services/api/types/model";
import { LOCATIONS } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import head from "lodash/head";

class FetchPrepareDataService {
  constructor(
    private readonly _weatherDataApi: typeof WeatherDataApi,
    private readonly _localStorageService: typeof LocalStorageService
  ) {}

  private async _getWeatherCity(
    coords: IGeoCoordinates,
    setStorage?: boolean
  ): Promise<IWeatherLocation | void> {
    const data = await this._weatherDataApi.fetchWeatherData(coords);

    const prepareData = this._prepareData(data);

    if (setStorage) {
      this._localStorageService.set(LOCATIONS, prepareData.location);
    }

    return prepareData;
  }

  private _prepareData(data: IFetchWeatherData): IWeatherLocation {
    return {
      location: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      visibility: data.visibility,
      description: head(data.weather)!.description,
      icon: head(data.weather)!.icon,
      speed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      id: uuidv4(),
    };
  }

  public async addCity(
    city: string,
    setStorage?: boolean
  ): Promise<IWeatherLocation | void> {
    const coords = await this._getCoords(city);
    if (coords) {
      return await this._getWeatherCity(coords, setStorage);
    }
  }

  private async _addNativeCity(): Promise<IWeatherLocation[] | void> {
    const coords = await this._getNativeCoords();
    if (coords) {
      const result = await this._getWeatherCity(coords, true);
      if (result) {
        return [result];
      }
    }
  }

  private async _getCitiesWeather(
    locations: string[]
  ): Promise<(IWeatherLocation | void)[]> {
    return Promise.all(locations!.map(async (el) => await this.addCity(el)));
  }

  private async _getCoords(city: string): Promise<IGeoCoordinates | void> {
    return await this._weatherDataApi.getLatLon(city);
  }

  private async _getNativeCoords(): Promise<IGeoCoordinates | void> {
    return await this._weatherDataApi.getNativeLocation();
  }

  public prepareSetDataToStorage(data: IWeatherLocation[]) {
    this._localStorageService.changeData(
      LOCATIONS,
      data.map((el: IWeatherLocation) => el.location)
    );
  }

  public async getWeather(): Promise<
    IWeatherLocation[] | void | (IWeatherLocation | void)[]
  > {
    const locations = this._localStorageService.get(LOCATIONS);

    return locations
      ? await this._getCitiesWeather(locations)
      : await this._addNativeCity();
  }
}

export default new FetchPrepareDataService(WeatherDataApi, LocalStorageService);
