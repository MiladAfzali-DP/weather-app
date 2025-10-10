import "./DailyForecast.css";
import Box from "../Box/Box";
import Wraper from "../Wraper/Wraper";
function DailyForecast({ dfData, tempStatus }) {
  const dfDatas = [];
  if (tempStatus === "finish")
    for (let i = 0; i < 7; i++) {
      dfDatas.push({
        day: dfData?.days[i],
        icon: dfData?.icons[i],
        lowestTemp: `${Math.floor(dfData?.minTemp[i])}˚`,
        highestTemp: `${Math.floor(dfData?.maxTemp[i])}˚`,
      });
    }
  return (
    <div className="df">
      <h4>Daily Forecast</h4>
      <Wraper className="df-wraper">
        {dfDatas.map((dfData, i) => (
          <Box className="df-box" key={i}>
            {tempStatus === "finish" && (
              <>
                <span>{dfData.day}</span>
                <img src={`/src/assets/images/${dfData.icon}`} />
                <div>
                  <span>{dfData.highestTemp}</span>
                  <span>{dfData.lowestTemp}</span>
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
