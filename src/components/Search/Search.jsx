import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
import { useCallback, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import DropDownList from "../DropDownList/DropDownList";
import DropDownListItem from "../DropDownListItem/DropDownListItem";

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

        <DropDownList
          status={searchStatus}
          errMessage={searchErrMessage}
          data={city}
        >
          {results &&
            results.map((result, i) => (
              <DropDownListItem
                key={i}
                onClick={() =>
                  dispatch({ type: "setSelectCityId", payload: i })
                }
                className={i === selectCityId ? "select" : ""}
              >
                {result.name} ({result.country})
              </DropDownListItem>
            ))}
        </DropDownList>
      </div>

      {/* Search Button */}
      <button
        onClick={() => {
          if (!selectCityId && selectCityId !== 0) return;
          // Send City Data for Weather
          dispatch({
            type: "getCityData",
          });
          dispatch({ type: "resetSearch" });
        }}
      >
        Search
      </button>
    </div>
  );
}
