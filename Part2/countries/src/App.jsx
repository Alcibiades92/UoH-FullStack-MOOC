import { useState, useEffect } from "react";
import calls from "./services/calls";
import SearchBar from "./components/SearchBar";

function App() {
  const [abbr, setAbbr] = useState("");
  const [all, setAll] = useState([]);
  const findCountry = function () {
    const SearchResult = all?.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(`${abbr.toLowerCase()}`) ||
        country.name.official.toLowerCase().includes(`${abbr.toLowerCase()}`)
      );
    });
    return SearchResult;
  };

  const handleInput = (event) => {
    setAbbr(event.target.value);
  };
  useEffect(() => {
    calls.All().then((response) => {
      setAll(response);
    });
  }, []);

  // Return logic
  if (!all) {
    return null;
  }

  return (
    <>
      <SearchBar onInputChange={handleInput} abbr={abbr} />
      <DisplayNames findCountry={findCountry} />
    </>
  );
}

function DisplayNames({ findCountry }) {
  const countriesName = findCountry()?.map((country) => country.name.common);
  const countries = findCountry();
  if (countries.length >= 10) {
    return <p> Too many countries to show! Be more specific</p>;
  }
  if (countries.length === 1) {
    return (
      <div>
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital : {countries[0].capital}</p>
          <p>Area : {countries[0].area}</p>
        </div>
        <div>
          <h3>Languages</h3>
          <ul>
            {Object.values(countries[0].languages).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <img
            src={countries[0].flags.png}
            alt="Flag of the Country choosen"
          ></img>
        </div>
      </div>
    );
  }
  return (
    <div>
      {countriesName.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}
export default App;
