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
  const [isTempLoading, setIsTempLoading] = useState(false);
  const [tempData, setTempData] = useState(null);

  //* Handle Function
  const handleGetLocationCity = (location) => setLocationCity(location);
  const handleGetTempData = (data) => setTempData(data);

  //* Effect Hook
  useEffect(
    function () {
      if (!locationCity) return;
      setIsTempLoading(true);
      async function getCityData() {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${locationCity.lat}&longitude=${locationCity.lon}&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,temperature_2m&windspeed_unit=kmh&timezone=auto
`
          );
          if (!res.ok) throw new Error(`Check your Internet: ${res.message}`);
          const data = await res.json();
          handleGetTempData([
            {
              temp: data.current_weather.temperature,
              unit: data.current_weather_units.temperature[0],
            },
            {
              feelsLike: data.hourly.apparent_temperature[0],
              unit: data.hourly_units.apparent_temperature[0],
            },
            {
              wind: data.current_weather.windspeed,
              unit: data.current_weather_units.windspeed,
            },
            {
              precipitation: data.hourly.precipitation[0],
              unit: data.hourly_units.precipitation,
            },
            {
              humidity: data.hourly.temperature_2m[0],
              unit: data.hourly_units.relativehumidity_2m,
            },
            { city: locationCity.city, country: locationCity.country },
            { weathercode: data.current_weather.weathercode },
          ]);
        } catch (err) {
          console.log(err);
        } finally {
          setIsTempLoading(false);
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
            <Temperature isTempLoading={isTempLoading} tempData={tempData} />
            <WeatherForecast
              isTempLoading={isTempLoading}
              tempData={tempData}
            />
            <DailyForecast />
          </WeatherDetails>
          <HourlyForecast />
        </Main>
      </Container>
    </div>
  );
}

export default App;
