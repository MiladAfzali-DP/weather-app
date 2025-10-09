import "./SearchResults.css";
function SearchResults({
  resutls,
  selectCityId,
  searchStatus,
  searchErrMessage,
  city,
  dispatch,
}) {
  return (
    <div className="search-results">
      {/* Handle Error */}
      {city && searchStatus === "error" && (
        <p className="loading-error">
          <img src="/src/assets/images/icon-error.svg" alt="" />
          <span>{searchErrMessage}</span>
        </p>
      )}

      {/* Handle Loading */}
      {city && searchStatus === "loading" && (
        <p className="loading-error">
          <img src="/src/assets/images/icon-loading.svg" alt="" />
          <span>Search in progress...</span>
        </p>
      )}

      {/* Show Results */}
      {searchStatus === "finish" &&
        resutls &&
        resutls.map((result, i) => (
          <p
            key={i}
            onClick={() => dispatch({ type: "setSelectCityId", payload: i })}
            className={i === selectCityId ? "select" : ""}
          >
            {result.name} ({result.country})
          </p>
        ))}
    </div>
  );
}

export default SearchResults;
