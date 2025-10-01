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
import useFetchData from "../../hooks/useFetchData";

function App() {
  //* State Hook
  const [locationCity, setLocationCity] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [weatherData, isTempLoading, isTempError] = useFetchData(
    `https://api.open-meteo.com/v1/forecast?latitude=${locationCity?.lat}&longitude=${locationCity?.lng}&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,temperature_2m&windspeed_unit=kmh&timezone=auto`,
    null,
    !locationCity
  );
  //* Handle Function
  const handleGetLocationCity = (location) => setLocationCity(location);
  const handleGetTempData = (data) => setTempData(data);

  //* Effect Hook
  useEffect(
    function () {
      weatherData &&
        handleGetTempData([
          {
            temp: weatherData.current_weather.temperature,
            unit: weatherData.current_weather_units.temperature[0],
          },
          {
            feelsLike: weatherData.hourly.apparent_temperature[0],
            unit: weatherData.hourly_units.apparent_temperature[0],
          },
          {
            wind: weatherData.current_weather.windspeed,
            unit: weatherData.current_weather_units.windspeed,
          },
          {
            precipitation: weatherData.hourly.precipitation[0],
            unit: weatherData.hourly_units.precipitation,
          },
          {
            humidity: weatherData.hourly.temperature_2m[0],
            unit: weatherData.hourly_units.relativehumidity_2m,
          },
          { city: locationCity.city, country: locationCity.country },
          { weathercode: weatherData.current_weather.weathercode },
        ]);
    },
    [weatherData, locationCity]
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

        {/* Handle when Don't have any search */}
        {!tempData && !isTempLoading ? (
          <p className="no-results">No search result found!</p>
        ) : (
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
        )}
      </Container>
    </div>
  );
}

export default App;
