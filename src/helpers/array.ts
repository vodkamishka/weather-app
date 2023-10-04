import { IWeatherLocation } from "@/services/api/types/model";

export const getElOfArray = (array: IWeatherLocation[], id: string) =>
  array.find((el) => el.id === id);

export const changeElemArray = (
  array: IWeatherLocation[],
  currentId: string,
  previousId: string,
  currentIdEl: IWeatherLocation,
  previousIdEl: IWeatherLocation
) =>
  array.reduce(
    (acc: IWeatherLocation[], el: IWeatherLocation) =>
      el.id === currentId
        ? [...acc, previousIdEl]
        : el.id === previousId
        ? [...acc, currentIdEl]
        : [...acc, el],
    []
  );
