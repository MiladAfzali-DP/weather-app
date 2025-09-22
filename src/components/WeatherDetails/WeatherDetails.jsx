import "./WeatherDetails.css";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import Temperature from "../Temperature/Temperature";
function WeatherDetails() {
  return (
    <div className="weather-details">
      <Temperature />
      <WeatherForecast />
    </div>
  );
}

export default WeatherDetails;
