function HourlyForecastItem({ icon, time, temp }) {
  return (
    <li>
      <div>
        <img src={`/src/assets/images/icon-${icon}.webp`} />
        <span>{time}</span>
      </div>
      <span className="hf__list-temp">{temp}</span>
    </li>
  );
}

export default HourlyForecastItem;
