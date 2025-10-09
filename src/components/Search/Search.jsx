import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
import { useCallback, useEffect } from "react";
import SearchResults from "../SearchResults/SearchResults";
import useFetchData from "../../hooks/useFetchData";

export default function Search({ dispatch, city, results, selectCityId }) {
  const [searchResults, searchStatus, searchErrMessage] = useFetchData(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    useCallback((data) => {
      if (!data.results) return "We cannot found city";
    }, []),
    !city
  );
  //* Effect Hook
  useEffect(
    function () {
      searchResults &&
        dispatch({ type: "setResults", payload: searchResults.results });
    },
    [searchResults, dispatch]
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
          onChange={(e) =>
            dispatch({ type: "setCity", payload: e.target.value })
          }
        />

        <SearchResults
          resutls={results}
          selectCityId={selectCityId}
          searchStatus={searchStatus}
          searchErrMessage={searchErrMessage}
          city={city}
          dispatch={dispatch}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={() => {
          if (!selectCityId && selectCityId !== 0) return;
          const selectCity = results[selectCityId];

          // Send City Data for Weather
          dispatch({
            type: "getCityData",
            payload: {
              lat: selectCity.latitude,
              lng: selectCity.longitude,
              city: selectCity.name,
              country: selectCity.country,
            },
          });
          dispatch({ type: "resetSearch" });
        }}
      >
        Search
      </button>
    </div>
  );
}
