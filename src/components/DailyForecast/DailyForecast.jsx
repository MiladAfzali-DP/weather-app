import "./DailyForecast.css";
import Box from "../Box/Box";
import Wraper from "../Wraper/Wraper";
function DailyForecast() {
  const dfDatas = [
    { day: "Tue", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
    { day: "Wed", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
    { day: "Thu", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
    { day: "Fri", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
    { day: "Sat", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
    { day: "Sun", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
    { day: "Mon", icon: "snow", lowestTemp: "14˚", highestTemp: "21˚" },
  ];
  return (
    <div className="df">
      <h4>Daily Forecast</h4>
      <Wraper className="df-wraper">
        {dfDatas.map((dfData, i) => (
          <Box className="df-box" key={i}>
            <span>{dfData.day}</span>
            <img src={`/src/assets/images/icon-${dfData.icon}.webp`} />
            <div>
              <span>{dfData.highestTemp}</span>
              <span>{dfData.lowestTemp}</span>
            </div>
          </Box>
        ))}
      </Wraper>
    </div>
  );
}

export default DailyForecast;
