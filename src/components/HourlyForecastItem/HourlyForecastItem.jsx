function HourlyForecastItem({ icon, time, temp, unit }) {
  const editTime = Number(time.slice(0, 2));
  return (
    <li>
      <div>
        <img src={`/src/assets/images/${icon}`} />
        <span>
          {editTime} {editTime > 12 ? "PM" : "AM"}
        </span>
      </div>
      <span className="hf__list-temp">
        {temp}
        {unit}
      </span>
    </li>
  );
}

export default HourlyForecastItem;
