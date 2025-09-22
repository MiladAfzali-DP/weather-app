import "./WeatherForecast.css";
import Box from "../Box/Box";
function WeatherForecast() {
  const wfDatas = [
    ["Feels Like", "18˚"],
    ["Humidity", "46%"],
    ["Wind", "14 km/h"],
    ["Precipitation", "0 mm"],
  ];
  return (
    <div className="wf">
      {wfDatas.map((wfData) => (
        <Box className="wf-box">
          <span>{wfData[0]}</span>
          <span>{wfData[1]}</span>
        </Box>
      ))}
    </div>
  );
}

export default WeatherForecast;
