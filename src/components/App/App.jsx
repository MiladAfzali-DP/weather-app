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
import { useEffect, useReducer } from "react";
import useFetchData from "../../hooks/useFetchData";
import Error from "../Error/Error";

const initialState = {
  locationCity: null,
  city: "",
  results: null,
  selectCityId: null,
  tempData: null,
  dfData: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "getCityData":
      return { ...state, locationCity: action.payload };
    case "getTempData":
      return { ...state, tempData: action.payload };
    case "retry":
      return { ...state, locationCity: state.locationCity };
    case "setCity":
      return { ...state, city: action.payload, results: null };
    case "setResults":
      return { ...state, results: action.payload };
    case "setSelectCityId":
      return {
        ...state,
        selectCityId: action.payload,
        city: state.results[action.payload]?.name,
      };
    case "resetSearch":
      return { ...state, city: "", selectCityId: null, results: null };
    default:
      throw new Error("unknown");
  }
}
function App() {
  //* State Hook

  const [
    { locationCity, tempData, city, results, selectCityId, dfData },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [weatherData, tempStatus, tempErrMessage] = useFetchData(
    `https://api.open-meteo.com/v1/forecast?latitude=${locationCity?.lat}&longitude=${locationCity?.lng}&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,temperature_2m&windspeed_unit=kmh&timezone=auto`,
    null,
    !locationCity
  );
  const [dailyForecast, dailyForecastStatus, dailyForecastErrMessage] =
    useFetchData(
      `https://api.open-meteo.com/v1/forecast?latitude=${locationCity?.lat}&longitude=${locationCity?.lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );

  //* Handle Function
  const dataImage = new Map([
    [0, "icon-sunny.webp"],
    [1, "icon-sunny.webp"],
    [2, "icon-partly-cloudy.webp"],
    [3, "icon-overcast.webp"],
    [45, "icon-fog.webp"],
    [48, "icon-fog.webp"],
    [51, "icon-drizzle.webp"],
    [53, "icon-drizzle.webp"],
    [55, "icon-drizzle.webp"],
    [61, "icon-rain.webp"],
    [63, "icon-rain.webp"],
    [65, "icon-rain.webp"],
    [71, "icon-snow.webp"],
    [73, "icon-snow.webp"],
    [75, "icon-snow.webp"],
    [81, "icon-rain.webp"],
    [83, "icon-rain.webp"],
    [85, "icon-rain.webp"],
    [95, "icon-storm.webp"],
    [96, "icon-storm.webp"],
    [99, "icon-storm.webp"],
  ]);
  //* Effect Hook
  useEffect(
    function () {
      weatherData &&
        dispatch({
          type: "getTempData",
          payload: [
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
          ],
        });
    },
    [weatherData, locationCity]
  );
  // useEffect(
  //   function () {
  //     dailyForecast &&
  //       setDfData({
  //         days: dailyForecast.daily.time.map((dTime) =>
  //           new Date(dTime).toDateString().slice(0, 3)
  //         ),
  //         icons: dailyForecast.daily.precipitation_sum.map((dps) =>
  //           dataImage.get(dps)
  //         ),
  //         minTemp: dailyForecast.daily.temperature_2m_min,
  //         maxTemp: dailyForecast.daily.temperature_2m_max,
  //       });
  //   },
  //   [dailyForecast, dataImage]
  // );

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
        {tempStatus === "error" ? (
          <Error
            errMessage="We couldn't connect to the server (API error). Please try
again in a few moments."
            dispatch={dispatch}
          />
        ) : (
          <>
            <CitySearch>
              <h1>How's the sky looking today?</h1>
              <Search
                dispatch={dispatch}
                city={city}
                results={results}
                selectCityId={selectCityId}
              />
            </CitySearch>

            {/* Handle when Don't have any search */}
            {!tempData && tempStatus === "readyFetch" ? (
              <p className="no-results">No search result found!</p>
            ) : (
              <Main>
                <WeatherDetails>
                  <Temperature
                    tempStatus={tempStatus}
                    tempData={tempData}
                    dataImage={dataImage}
                  />
                  <WeatherForecast
                    tempStatus={tempStatus}
                    tempData={tempData}
                  />
                  <DailyForecast dfData={dailyForecast} dataImage={dataImage} />
                </WeatherDetails>
                <HourlyForecast />
              </Main>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
