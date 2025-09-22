import "./App.css";
import unitsIcon from "../../assets/images/icon-units.svg";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import Container from "../Container/Container";
import CitySearch from "../CitySearch/CitySearch";
import Search from "../Search/Search";
import Main from "../Main/Main";
import Wraper from "../Wraper/Wraper";

function App() {
  return (
    <div className="app">
      <Container>
        <Header>
          <Logo />
          <Button className="units">
            <img src={unitsIcon} alt="" />
            units
            <i className="bi bi-caret-down-fill icon units-icon"></i>
          </Button>
        </Header>
        <CitySearch>
          <h1>How's the sky looking today?</h1>
          <Search />
        </CitySearch>
        <Main></Main>
      </Container>
    </div>
  );
}

export default App;
