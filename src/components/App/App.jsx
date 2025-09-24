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
import { useEffect, useState } from "react";

function App() {
  //* State Hook
  const [locationCity, setLocationCity] = useState(null);

  //* Handle Function
  const handleGetLocationCity = (location) => setLocationCity(location);

  //* Effect Hook
  useEffect(
    function () {
      if (!locationCity) return;
      async function getCityData() {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${locationCity.lat}&longitude=${locationCity.lon}&current_weather=true`
          );
          if (!res.ok) throw new Error(`Check your Internet: ${res.message}`);
          const data = await res.json();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
      getCityData();
    },
    [locationCity]
  );
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
          <Search onGetLocationCity={handleGetLocationCity} />
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
