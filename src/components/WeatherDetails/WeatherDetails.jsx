import "./WeatherDetails.css";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import Temperature from "../Temperature/Temperature";
import DailyForecast from "../DailyForecast/DailyForecast";

function WeatherDetails() {
  return (
    <div className="weather-details">
      <Temperature />
      <WeatherForecast />
    </div>
  );
}

export default WeatherDetails;
