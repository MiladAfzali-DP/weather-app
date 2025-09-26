import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
import { useEffect, useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

export default function Search({ onGetLocationCity }) {
  //* State Hook
  const [city, setCity] = useState("s");
  const [results, setResults] = useState(null);
  const [selectCityId, setSelectCityId] = useState(0);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchError, setIsSearchError] = useState("");

  //* Handle Func
  const handleSearch = (e) => {
    setCity(e.target.value);
    setResults(null);
  };
  const handleGetResults = (res) => setResults(res);
  const handleSelectCityId = (selectId) => {
    setSelectCityId(selectId);
    setCity(results[selectId].name);
  };
  const resetSearch = () => {
    setCity("");
    setSelectCityId(0);
    setResults(null);
  };

  //* Effect Hook
  useEffect(
    function () {
      setIsSearchLoading(true);
      if (!city) return;

      //? Abort Var
      const controller = new AbortController();
      const signal = controller.signal;

      //? Async Function For fetch Data
      async function getLocation() {
        try {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
            { signal }
          );
          if (!res.ok) throw new Error(`Check your Internet: ${res.message}`);

          const data = await res.json();
          if (!data.results) throw new Error("We cannot found city");
          handleGetResults(data.results);
          setIsSearchLoading(false);
          setIsSearchError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsSearchError(err.message);
          }
        }
      }
      getLocation();
      return () => controller.abort();
    },
    [city]
  );
  return (
    <div className="search">
      {/* Search Box */}
      <div className="input">
        <img src={searchIcon} />
        <input
          type="text"
          placeholder="Search and select a city..."
          value={city}
          onChange={handleSearch}
        />
        <SearchResults
          resutls={results}
          onSelectCityId={handleSelectCityId}
          selectCityId={selectCityId}
          isSearchLoading={isSearchLoading}
          isSearchError={isSearchError}
          city={city}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={() => {
          if (!selectCityId && selectCityId !== 0) return;
          const selectCity = results[selectCityId];

          // Send City Data for Weather
          onGetLocationCity({
            lat: selectCity.latitude,
            lon: selectCity.longitude,
            city: selectCity.name,
            country: selectCity.country,
          });
          resetSearch();
        }}
      >
        Search
      </button>
    </div>
  );
}
