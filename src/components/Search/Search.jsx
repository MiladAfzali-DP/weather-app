import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
import { useEffect, useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

export default function Search({ onGetLocationCity }) {
  //* State Hook
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [selectCityId, setSelectCityId] = useState(null);

  //* Handle Func
  const handleSearch = (e) => setCity(e.target.value);
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

          const data = await res.json();
          if (!data.results) throw new Error("We cannot found city");
          handleGetResults(data.results);
        } catch (err) {
          console.log(err);
        }
      }
      getLocation();
      return () => controller.abort();
    },
    [city]
  );

  return (
    <div className="search">
      <div className="input">
        <img src={searchIcon} />
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={handleSearch}
        />
        <SearchResults
          resutls={city && results}
          onSelectCityId={handleSelectCityId}
          selectCityId={selectCityId}
        />
      </div>
      <button
        onClick={() => {
          const selectCity = results[selectCityId];
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
