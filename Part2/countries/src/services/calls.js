import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;
const allCountries = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

const All = () => {
  return axios.get(allCountries).then((response) => response.data);
};

const One = (countryName) => {
  return axios
    .get(`${baseUrl}/${countryName}`)
    .then((response) => response.data);
};

const Weather = (lat, lon) => {
  const url = `${baseWeatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}`;
  console.log(url);
  const response = axios.get(url);
  return response.then((re) => re.data);
};

const WeatherCity = (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
  console.log(url);
  const response = axios.get(url);
  return response.then((re) => re.data);
};
export default { All, One, Weather, WeatherCity };
