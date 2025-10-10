import "./DailyForecast.css";
import Box from "../Box/Box";
import Wraper from "../Wraper/Wraper";
function DailyForecast({ dfData, tempStatus }) {
  const dfDatas = dfData?.days.map((_, i) => {
    return {
      day: dfData?.days[i],
      icon: dfData?.icons[i],
      lowestTemp: `${Math.floor(dfData?.minTemp.temp[i])}${
        dfData?.minTemp.unit[0]
      }`,
      highestTemp: `${Math.floor(dfData?.maxTemp.temp[i])}${
        dfData?.maxTemp.unit[0]
      }`,
    };
  });

  return (
    <div className="df">
      <h4>Daily Forecast</h4>
      <Wraper className="df-wraper">
        {dfDatas?.map((dfData, i) => (
          <Box className="df-box" key={i}>
            {tempStatus === "finish" && (
              <>
                <span>{dfData?.day}</span>
                <img src={`/src/assets/images/${dfData?.icon}`} />
                <div>
                  <span>{dfData?.highestTemp}</span>
                  <span>{dfData?.lowestTemp}</span>
                </div>
              </>
            )}
          </Box>
        ))}
      </Wraper>
    </div>
  );
}

export default DailyForecast;
