import styles from "./DailyForecast.module.css";
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
    <div className={styles.df}>
      <h4>Daily Forecast</h4>
      <Wraper className={styles.dfWraper}>
        {dfDatas?.map((dfData, i) => (
          <Box className={styles.dfBox} key={i}>
            {tempStatus === "finish" && (
              <>
                <span>{dfData?.day}</span>
                <img src={`./${dfData?.icon}`} />
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
