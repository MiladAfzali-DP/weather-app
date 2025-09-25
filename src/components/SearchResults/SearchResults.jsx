import "./SearchResults.css";
function SearchResults({
  resutls,
  onSelectCityId,
  selectCityId,
  isLoading,
  city,
}) {
  // if (!resutls) return;
  return (
    <div className="search-results">
      {city && isLoading && <p className="loading">Search in progress...</p>}
      {!isLoading &&
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
