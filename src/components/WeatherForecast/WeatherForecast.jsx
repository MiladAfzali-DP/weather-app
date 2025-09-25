import "./WeatherForecast.css";
import Box from "../Box/Box";
function WeatherForecast({ isTempLoading, tempData }) {
  const wfDatas = [
    [
      "Feels Like",
      isTempLoading || !tempData
        ? "-"
        : `${tempData[1].feelsLike}${tempData[1].unit}`,
    ],
    [
      "Humidity",
      isTempLoading || !tempData
        ? "-"
        : `${tempData[4].humidity}${tempData[4].unit}`,
    ],
    [
      "Wind",
      isTempLoading || !tempData
        ? "-"
        : `${tempData[2].wind} ${tempData[2].unit}`,
    ],
    [
      "Precipitation",
      isTempLoading || !tempData
        ? "-"
        : `${tempData[3].precipitation} ${tempData[3].unit}`,
    ],
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
