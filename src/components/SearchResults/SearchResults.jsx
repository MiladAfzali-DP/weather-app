import "./SearchResults.css";
function SearchResults({
  resutls,
  onSelectCityId,
  selectCityId,
  isLoading,
  isSearchError,
  city,
}) {
  console.log(isSearchError);
  return (
    <div className="search-results">
      {city && isSearchError && (
        <p className="loading-error">{isSearchError}</p>
      )}
      {city && !isSearchError && isLoading && (
        <p className="loading-error">Search in progress...</p>
      )}
      {!isLoading &&
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
