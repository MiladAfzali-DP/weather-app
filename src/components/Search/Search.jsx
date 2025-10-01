import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
import { useCallback, useEffect, useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import useFetchData from "../../hooks/useFetchData";

export default function Search({ onGetLocationCity }) {
  //* State Hook
  const [city, setCity] = useState("");
  const [results, setResults] = useState("");
  const [selectCityId, setSelectCityId] = useState(0);

  const [searchResults, isSearchLoading, isSearchError] = useFetchData(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    useCallback((data) => {
      if (!data.results) return "We cannot found city";
    }, []),
    !city
  );

  console.log("test");
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
      searchResults && handleGetResults(searchResults.results);
    },
    [searchResults]
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
            lng: selectCity.longitude,
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
