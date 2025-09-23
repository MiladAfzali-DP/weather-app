import Button from "../Button/Button";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";
import "./HourlyForecast.css";
function HourlyForecast() {
  const hfDatas = [
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
    { icon: "rain", time: "5 pm", temp: "69˚" },
  ];
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
          }}
        >
          Tuesday
          <i className="bi bi-caret-down-fill icon units-icon"></i>
        </Button>
      </div>
      <ul className="hf__list">
        {hfDatas.map((hfData) => (
          <HourlyForecastItem
            icon={hfData.icon}
            time={hfData.time}
            temp={hfData.temp}
          />
        ))}
      </ul>
    </div>
  );
}

export default HourlyForecast;
