import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
import { useEffect, useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

export default function Search({ onGetLocationCity }) {
  //* State Hook
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [selectCityId, setSelectCityId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //* Handle Func
  const handleSearch = (e) => {
    setCity(e.target.value);
    setResults(null);
  };
  const handleGetResults = (res) => setResults(res);
  const handleSelectCityId = (selectId) => setSelectCityId(selectId);
  const resetSearch = () => {
    setCity("");
    setSelectCityId(null);
    setResults(null);
  };

  //* Effect Hook
  useEffect(
    function () {
      setIsLoading(true);
      if (!city) return;
      const controller = new AbortController();
      const signal = controller.signal;
      async function getLocation() {
        try {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
            { signal }
          );
          if (!res.ok) throw new Error(`Check your Internet: ${res.message}`);

          if (!signal.aborted) {
            const data = await res.json();
            if (!data.results) throw new Error("We cannot found city");
            handleGetResults(data.results);
          } else throw new Error(`HTTP error! Status: ${res.status}`);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("❌ خطا:", err);
          }
        } finally {
          setIsLoading(false);
        }
      }
      getLocation();
      return () => controller.abort();
    },
    [city]
  );
  console.log(isLoading);
  return (
    <div className="search">
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
          isLoading={isLoading}
          city={city}
        />
      </div>
      <button
        onClick={() => {
          const selectCity = results[selectCityId];
          if (!selectCity) return;
          onGetLocationCity({
            lat: selectCity.latitude,
            lon: selectCity.longitude,
          });
          resetSearch();
        }}
      >
        Search
      </button>
    </div>
  );
}
