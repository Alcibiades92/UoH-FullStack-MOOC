import { useState, useEffect } from "react";
import calls from "./services/calls";
import SearchBar from "./components/SearchBar";
import { DisplaySome } from "./components/DisplaySome";

function App() {
  const [abbr, setAbbr] = useState("");
  const [all, setAll] = useState([]);
  const [cityData, setCityData] = useState(null);

  const findCountry = function () {
    const SearchResult = all?.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(`${abbr.toLowerCase()}`) ||
        country.name.official.toLowerCase().includes(`${abbr.toLowerCase()}`)
      );
    });
    return SearchResult;
  };
  const howMany = findCountry();

  const handleInput = (event) => {
    setAbbr(event.target.value);
  };
  // fetching all the countries
  useEffect(() => {
    calls.All().then((response) => {
      setAll(response);
    });
  }, []);
  //fetching weather data for a specific country
  useEffect(() => {
    if (howMany.length === 1) {
      const cityName = howMany[0].capital;
      calls.WeatherCity(cityName).then((response) => {
        setCityData(response);
        // console.log(response);
        return response;
      });
    }
  }, [howMany.length]);
  // Return logic
  if (!all) {
    return null;
  }

  return (
    <>
      <SearchBar onInputChange={handleInput} abbr={abbr} />
      <Display
        findCountry={findCountry}
        setAbbr={setAbbr}
        cityData={cityData}
        howMany={howMany}
      />
    </>
  );
}

function Display({ findCountry, setAbbr, howMany, cityData }) {
  const countriesName = findCountry()?.map((country) => country.name.common);
  const countries = findCountry();
  if (countries.length >= 10) {
    return <p> Too many countries to show! Be more specific</p>;
  } else if (countries.length === 1) {
    return (
      <DisplayOne countries={countries} howMany={howMany} cityData={cityData} />
    );
  }

  return <DisplaySome countriesName={countriesName} setAbbr={setAbbr} />;
}
export default App;

function DisplayOne({ countries, howMany, cityData }) {
  const country = countries[0];
  return (
    <div>
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital : {country.capital}</p>
        <p>Area : {country.area}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
        <div>
          <img
            style={{ border: "0.2em solid black", width: "150px" }}
            src={country.flags.png}
            alt="Flag of the Country choosen"
          ></img>
          <div>
            <Weather howMany={howMany} cityData={cityData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Weather({ cityData }) {
  if (!cityData) return null;

  return (
    <div>
      <h3>Weather in {cityData?.name}</h3>
      <h4>Temperature {Math.round(cityData.main.temp - 273)} °C</h4>

      {cityData.weather.map((condition) => (
        <div key={condition.description}>
          <img
            src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
            alt="icon representing weather state"
          ></img>

          <p>
            <strong>{condition.main}</strong>
          </p>
          <p>{condition.description}</p>
        </div>
      ))}
    </div>
  );
}
