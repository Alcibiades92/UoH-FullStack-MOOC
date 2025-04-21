import axios from "axios";

const allCountries = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const All = () => {
  return axios.get(allCountries).then((response) => response.data);
};

const One = (countryName) => {
  return axios
    .get(`${baseUrl}/${countryName}`)
    .then((response) => response.data);
};
export default { All, One };
