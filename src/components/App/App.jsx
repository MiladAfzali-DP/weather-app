import "./App.css";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import unitsIcon from "../../assets/images/icon-units.svg";
function App() {
  return (
    <div className="app">
      <Header>
        <Logo />
        <Button>
          <img src={unitsIcon} alt="" />
          units
          <i className="bi bi-caret-down-fill"></i>
        </Button>
      </Header>
    </div>
  );
}

export default App;
