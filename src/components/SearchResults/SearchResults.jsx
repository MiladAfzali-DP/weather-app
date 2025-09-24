import "./SearchResults.css";
function SearchResults({ resutls, onSelectCityId, selectCityId }) {
  if (!resutls) return;
  return (
    <div className="search-results">
      {resutls.map((result, i) => (
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
