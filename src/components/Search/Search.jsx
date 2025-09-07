import "./Search.css";
import searchIcon from "../../assets/images/icon-search.svg";
export default function Search() {
  return (
    <div className="search">
      <div className="input">
        <img src={searchIcon} />
        <input type="text" placeholder="Search for a city..." />
      </div>
      <button>Search</button>
    </div>
  );
}
