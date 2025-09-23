import "./App.css";
import unitsIcon from "../../assets/images/icon-units.svg";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import Container from "../Container/Container";
import CitySearch from "../CitySearch/CitySearch";
import Search from "../Search/Search";
import Main from "../Main/Main";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import Temperature from "../Temperature/Temperature";
import DailyForecast from "../DailyForecast/DailyForecast";

function App() {
  return (
    <div className="app">
      <Container>
        <Header>
          <Logo />
          <Button className="btn">
            <img src={unitsIcon} alt="" />
            units
            <i className="bi bi-caret-down-fill icon units-icon"></i>
          </Button>
        </Header>
        <CitySearch>
          <h1>How's the sky looking today?</h1>
          <Search />
        </CitySearch>
        <Main>
          <WeatherDetails>
            <Temperature />
            <WeatherForecast />
            <DailyForecast />
          </WeatherDetails>
          <HourlyForecast />
        </Main>
      </Container>
    </div>
  );
}

export default App;
