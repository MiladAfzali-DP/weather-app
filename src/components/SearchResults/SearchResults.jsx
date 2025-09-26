import "./SearchResults.css";
function SearchResults({
  resutls,
  onSelectCityId,
  selectCityId,
  isSearchLoading,
  isSearchError,
  city,
}) {
  return (
    <div className="search-results">
      {/* Handle Error */}
      {city && isSearchError && (
        <p className="loading-error">
          <img src="/src/assets/images/icon-error.svg" alt="" />
          <span>{isSearchError}</span>
        </p>
      )}

      {/* Handle Loading */}
      {city && !isSearchError && isSearchLoading && (
        <p className="loading-error">
          <img src="/src/assets/images/icon-loading.svg" alt="" />
          <span>Search in progress...</span>
        </p>
      )}

      {/* Show Results */}
      {!isSearchLoading &&
        !isSearchError &&
        resutls &&
        resutls.map((result, i) => (
          <p
            key={i}
            onClick={() => onSelectCityId(i)}
            className={i === selectCityId ? "select" : ""}
          >
            {result.name} ({result.country})
          </p>
        ))}
    </div>
  );
}

export default SearchResults;
