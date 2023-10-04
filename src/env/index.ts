export const getEnvWeatherOpenApi = (): string =>
  process.env.VUE_APP_WEATHER_OPEN_API || "";

export const getEnvDataWeather = (): string =>
  process.env.VUE_APP_WEATHER_DATA || "";

export const getEnvLatLon = (): string => process.env.VUE_APP_GET_LAT_LON || "";

export const getEnvApiKey = (): string => process.env.VUE_APP_API_KEY || "";
