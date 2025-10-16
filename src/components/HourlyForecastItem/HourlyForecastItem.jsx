function HourlyForecastItem({ data, now, tempStatus }) {
  const { icon, time, temp, unit } = data;

  const editTime = Number(time.slice(0, 2));
  return (
    <li className={now ? "active-list" : ""}>
      {tempStatus === "loading" && ""}
      {tempStatus === "finish" && (
        <>
          <div>
            <img src={`./${icon}`} />
            <span>
              {String(editTime).padStart(2, "0")} {editTime > 12 ? "PM" : "AM"}
            </span>
          </div>
          <span className="hf__list-temp">
            {temp}
            {unit}
          </span>
        </>
      )}
    </li>
  );
}

export default HourlyForecastItem;
