import baseService from "./baseService";

export const getCurrentWeather = (query: string) =>
  baseService().get(
    `/current.json?key=${process.env.REACT_APP_WHEATHER_API_KEY}&q=${query}`
  );
