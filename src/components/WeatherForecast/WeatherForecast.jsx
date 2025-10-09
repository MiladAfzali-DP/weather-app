import "./WeatherForecast.css";
import Box from "../Box/Box";
function WeatherForecast({ tempStatus, tempData }) {
  let wfDatas;
  if (tempStatus === "loading" || !tempData)
    wfDatas = [
      ["Feels Like", "-"],
      ["Humidity", "-"],
      ["Wind", "-"],
      ["Precipitation", "-"],
    ];
  else
    wfDatas = [
      ["Feels Like", `${tempData[1].feelsLike}${tempData[1].unit}`],
      ["Humidity", `${tempData[4].humidity}${tempData[4].unit}`],
      ["Wind", `${tempData[2].wind} ${tempData[2].unit}`],
      ["Precipitation", `${tempData[3].precipitation} ${tempData[3].unit}`],
    ];
  return (
    <div className="wf">
      {wfDatas.map((wfData, i) => (
        <Box className="wf-box" key={i}>
          <span>{wfData[0]}</span>
          <span>{wfData[1]}</span>
        </Box>
      ))}
    </div>
  );
}

export default WeatherForecast;
