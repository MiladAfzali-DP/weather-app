import Button from "../Button/Button";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";
import "./HourlyForecast.css";
function HourlyForecast({ hfData }) {
  return (
    <div className="hf">
      <div className="hf__title">
        <h4>Hourly Forecast</h4>
        <Button
          className="btn"
          style={{
            backgroundColor: "var(--neutral-600)",
            width: "6rem",
            height: "2rem",
            fontSize: "0.8rem",
          }}
        >
          Tuesday
          <i className="bi bi-caret-down-fill icon units-icon"></i>
        </Button>
      </div>
      <ul className="hf__list">
        {hfData &&
          Object.entries(hfData)?.[0][1].map((data, i) => (
            <HourlyForecastItem
              icon={data.icon}
              time={data.time}
              temp={data.temp}
              unit={data.unit}
              key={i}
            />
          ))}
      </ul>
    </div>
  );
}

export default HourlyForecast;
