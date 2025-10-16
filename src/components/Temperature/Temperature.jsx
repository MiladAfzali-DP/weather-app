import styles from "./Temperature.module.css";
function Temperature({ tempStatus, tempData, dataImage }) {
  const data = new Date().toDateString().split(" ");
  const dataTime = {
    dayStr: data[0],
    dayNum: data[1],
    month: data[2],
    year: data[3],
  };

  return (
    <div
      className={
        tempStatus === "loading" || !tempData ? styles.loadingTemp : styles.temp
      }
    >
      {/* Handle Loading */}
      {tempStatus === "loading" && (
        <>
          <div className={styles.loadingTempDot}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Loading...</p>
        </>
      )}

      {/* Show Temp */}
      {tempStatus === "finish" && tempData && (
        <>
          <div className={styles.tempLeft}>
            <h4>
              {tempData[5].city}, {tempData[5].country}
            </h4>
            <p>
              {dataTime.dayStr}, {dataTime.month} {dataTime.dayNum},{" "}
              {dataTime.year}
            </p>
          </div>
          <div className={styles.tempRight}>
            <h3>
              {tempData[0]?.temp}
              {tempData[0]?.unit}
            </h3>
            <img src={`./${dataImage.get(tempData[6].weathercode)}`} />
          </div>
        </>
      )}
    </div>
  );
}

export default Temperature;
