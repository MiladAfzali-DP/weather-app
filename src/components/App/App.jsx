// Css Import
import "./App.css";

// React Hook Import
import { useEffect, useMemo, useReducer } from "react";

// React Component Import
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
import useFetchData from "../../hooks/useFetchData";
import Error from "../Error/Error";

// Utils Function Import
import { formatDate } from "../../utils/formatDate";
import DropDownList from "../DropDownList/DropDownList";
import DropDownListItem from "../DropDownListItem/DropDownListItem";
import DropDownListTitle from "../DropDownListTitle/DropDownListTitle";

// Initial var for default value in reduce function (useReducer)
const initialState = {
  locationCity: null,
  city: "",
  results: null,
  selectCityId: null,
  tempData: null,
  dfData: null,
  hfData: null,
  weekDays: null,
  isOpenDropDowns: null,
  imperialMode: false,
  unit: { tempUnit: "celsius", windSpeadUnit: "kmh", precUnit: "mm" },
};

// Reducer Function (useReducer) (Logic App)
function reducer(state, action) {
  switch (action.type) {
    case "getCityData": {
      const selectCity = state.results?.[state.selectCityId];
      return {
        ...state,
        locationCity: {
          lat: selectCity.latitude,
          lng: selectCity.longitude,
          city: selectCity.name,
          country: selectCity.country,
        },
      };
    }
    case "getTempData": {
      const hourlyData = action.payload?.hourly;
      const groupedByDay = {};

      hourlyData.time.forEach((timestamp, index) => {
        const date = timestamp.split("T")[0]; // فقط بخش روز مثل "2025-10-10"

        if (!groupedByDay[date]) groupedByDay[date] = [];

        groupedByDay[date].push({
          time: timestamp.split("T")[1], // ساعت مثل "03:00"
          temp: Math.floor(hourlyData.temperature_2m[index]),
          unit: action.payload.hourly_units.temperature_2m[0],
          icon: action.dataImage.get(hourlyData.weathercode[0]),
        });
      });
      return {
        ...state,
        tempData: [
          {
            temp: action.payload.current_weather.temperature,
            unit: action.payload.current_weather_units.temperature[0],
          },
          {
            feelsLike: action.payload.hourly.apparent_temperature[0],
            unit: action.payload.hourly_units.apparent_temperature[0],
          },
          {
            wind: action.payload.current_weather.windspeed,
            unit: action.payload.current_weather_units.windspeed,
          },
          {
            precipitation: action.payload.hourly.precipitation[0],
            unit: action.payload.hourly_units.precipitation,
          },
          {
            humidity: action.payload.hourly.temperature_2m[0],
            unit: action.payload.hourly_units.relativehumidity_2m,
          },
          {
            city: state.locationCity.city,
            country: state.locationCity.country,
          },
          { weathercode: action.payload.current_weather.weathercode },
        ],
        dfData: {
          days: action.payload.daily.time.map((dTime) =>
            new Date(dTime).toDateString().slice(0, 3)
          ),
          icons: action.payload.daily.weathercode.map((dps) =>
            action.dataImage.get(dps)
          ),
          minTemp: {
            temp: action.payload.daily.temperature_2m_min,
            unit: action.payload.daily_units.temperature_2m_min,
          },
          maxTemp: {
            temp: action.payload.daily.temperature_2m_max,
            unit: action.payload.daily_units.temperature_2m_max,
          },
        },
        hfData: groupedByDay,
      };
    }
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
    case "setDfData":
      return { ...state, dfData: action.payload };
    case "getWeekDays":
      return {
        ...state,
        weekDays: action.payload.map((day) =>
          formatDate(new Date(day[0]), { weekday: "long" })
        ),
      };
    case "openDropDown":
      return {
        ...state,
        isOpenDropDowns:
          state.isOpenDropDowns === action.payload ? null : action.payload,
      };
    case "switchToImperial": {
      if (state.imperialMode)
        return {
          ...state,
          imperialMode: !state.imperialMode,
          unit: { tempUnit: "celsius", windSpeadUnit: "kmh", precUnit: "mm" },
        };
      else
        return {
          ...state,
          imperialMode: !state.imperialMode,
          unit: {
            tempUnit: "fahrenheit",
            windSpeadUnit: "mph",
            precUnit: "inch",
          },
        };
    }
    case "changeTempUnit":
      return {
        ...state,
        unit: {
          ...state.unit,
          tempUnit: action.payload,
        },
      };

    case "changeWindSpeadUnit":
      return {
        ...state,
        unit: {
          ...state.unit,
          windSpeadUnit: action.payload,
        },
      };
    case "changePrecUnit":
      return {
        ...state,
        unit: {
          ...state.unit,
          precUnit: action.payload,
        },
      };
    default:
      throw new Error("unknown");
  }
}
function App() {
  // Hook
  const [
    {
      locationCity,
      tempData,
      dfData,
      hfData,
      city,
      results,
      selectCityId,
      weekDays,
      isOpenDropDowns,
      unit,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Get data from api for show weather
  const [weatherData, tempStatus] = useFetchData(
    `https://api.open-meteo.com/v1/forecast?latitude=${locationCity?.lat}&longitude=${locationCity?.lng}&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&wind-speed_unit=kmh&timezone=auto&temperature_unit=${unit.tempUnit}&wind_speed_unit=${unit.windSpeadUnit}&precipitation_unit=${unit.precUnit}`,
    null,
    !locationCity
  );

  // Data images for show weather with image
  const dataImage = useMemo(
    () =>
      new Map([
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
        [80, "icon-rain.webp"],
        [81, "icon-rain.webp"],
        [83, "icon-rain.webp"],
        [85, "icon-rain.webp"],
        [95, "icon-storm.webp"],
        [96, "icon-storm.webp"],
        [99, "icon-storm.webp"],
      ]),
    []
  );
  const unitsListData = {
    imperial: "Switch to Imperial",
    temperature: ["Celsius (°C)", "Fahrenheit (°F)"],
    windSpeed: ["km/h", "mp/h"],
    precipitation: ["Millimeters (mm)", "Inches (inch)"],
  };

  useEffect(
    function () {
      weatherData &&
        dispatch({
          type: "getTempData",
          payload: weatherData,
          dataImage: dataImage,
        });
    },
    [weatherData, dataImage]
  );
  return (
    <div className="app">
      <Container>
        {/* Header App */}
        <Header>
          <Logo />
          <Button
            className="btn"
            onClick={() => dispatch({ type: "openDropDown", payload: 1 })}
          >
            <img src={unitsIcon} alt="" />
            units
            <i
              className={`bi bi-caret-${
                isOpenDropDowns === 1 ? "up" : "down"
              }-fill icon units-icon`}
            ></i>
          </Button>
          {isOpenDropDowns === 1 && (
            <DropDownList customStyle={{ left: "none", width: "13rem" }}>
              <DropDownListItem
                onClick={() => dispatch({ type: "switchToImperial" })}
              >
                {unitsListData.imperial}
              </DropDownListItem>
              <DropDownListTitle>Temperature</DropDownListTitle>
              {unitsListData.temperature.map((tempData, i) => {
                const formatData = tempData.split(" ")[0].toLocaleLowerCase();
                return (
                  <DropDownListItem
                    className={unit.tempUnit === formatData ? "select" : ""}
                    onClick={() =>
                      dispatch({
                        type: "changeTempUnit",
                        payload: formatData,
                      })
                    }
                    key={i}
                  >
                    {tempData}
                  </DropDownListItem>
                );
              })}
              <DropDownListTitle>Wind Spead</DropDownListTitle>
              {unitsListData.windSpeed.map((windSpeadData, i) => {
                const formatData = windSpeadData
                  .replace("/", "")
                  .toLocaleLowerCase();

                return (
                  <DropDownListItem
                    className={
                      unit.windSpeadUnit === formatData ? "select" : ""
                    }
                    onClick={() =>
                      dispatch({
                        type: "changeWindSpeadUnit",
                        payload: formatData,
                      })
                    }
                    key={i}
                  >
                    {windSpeadData}
                  </DropDownListItem>
                );
              })}
              <DropDownListTitle>Precipitation</DropDownListTitle>
              {unitsListData.precipitation.map((precData, i) => {
                const formatData = precData
                  .split(" ")[1]
                  .slice(1, -1)
                  .toLocaleLowerCase();
                return (
                  <DropDownListItem
                    className={unit.precUnit === formatData ? "select" : ""}
                    onClick={() =>
                      dispatch({
                        type: "changePrecUnit",
                        payload: formatData,
                      })
                    }
                    key={i}
                  >
                    {precData}
                  </DropDownListItem>
                );
              })}
            </DropDownList>
          )}
        </Header>
        {/* Body App */}

        {/* Handle Error */}
        {tempStatus === "error" ? (
          //           <Error
          //             errMessage="We couldn't connect to the server (API error). Please try
          // again in a few moments."
          //             dispatch={dispatch}
          //           />
          "test"
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
                  <DailyForecast
                    dfData={dfData}
                    tempStatus={tempStatus}
                    dataImage={dataImage}
                  />
                </WeatherDetails>
                <HourlyForecast
                  hfData={hfData}
                  tempStatus={tempStatus}
                  dispatch={dispatch}
                  weekDays={weekDays}
                  isOpenDropDowns={isOpenDropDowns}
                />
              </Main>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
