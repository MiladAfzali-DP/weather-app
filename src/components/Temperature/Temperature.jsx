import "./Temperature.css";
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
        tempStatus === "loading" || !tempData ? "loading-temp" : "temp"
      }
    >
      {/* Handle Loading */}
      {tempStatus === "loading" && (
        <>
          <div className="loading-temp-dot">
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
          <div className="temp__left">
            <h4>
              {tempData[5].city}, {tempData[5].country}
            </h4>
            <p>
              {dataTime.dayStr}, {dataTime.month} {dataTime.dayNum},{" "}
              {dataTime.year}
            </p>
          </div>
          <div className="temp__right">
            <h3>
              {tempData[0]?.temp}
              {tempData[0]?.unit}
            </h3>
            <img
              src={`/src/assets/images/${dataImage.get(
                tempData[6].weathercode
              )}`}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Temperature;
