import "./Temperature.css";
function Temperature({ isTempLoading, tempData }) {
  const now = new Date();
  const dataTime = {
    dayStr: new Intl.DateTimeFormat("us-en", { weekday: "long" }).format(
      now.getDay()
    ),
    dayNum: now.getDay(),
    month: new Intl.DateTimeFormat("us-en", { month: "short" }).format(
      now.getMonth()
    ),
    year: now.getFullYear(),
  };
  const dataImage = new Map([
    [0, "icon-sunny.webp"],
    [1, "icon-sunny.webp"],
    [2, "icon-partly-cloudy.webp"],
    [3, "icon-overcast.webp"],
    [45, "icon-fog.webp"],
    [48, "icon-fog.webp"],
    [51, "icon-drizzle.webp"],
    [53, "icon-drizzle.webp"],
    [55, "icon-drizzle.webp"],
    [61, "icon-rain.webp"],
    [63, "icon-rain.webp"],
    [65, "icon-rain.webp"],
    [71, "icon-snow.webp"],
    [73, "icon-snow.webp"],
    [75, "icon-snow.webp"],
    [81, "icon-rain.webp"],
    [83, "icon-rain.webp"],
    [85, "icon-rain.webp"],
    [95, "icon-storm.webp"],
    [96, "icon-storm.webp"],
    [99, "icon-storm.webp"],
  ]);
  return (
    <div className={isTempLoading || !tempData ? "loading-temp" : "temp"}>
      {/* Handle Loading */}
      {isTempLoading && (
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
      {!isTempLoading && tempData && (
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
