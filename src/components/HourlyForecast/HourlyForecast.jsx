import { useEffect, useState } from "react";
import Button from "../Button/Button";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";
import "./HourlyForecast.css";
import DropDownList from "../DropDownList/DropDownList";
import DropDownListItem from "../DropDownListItem/DropDownListItem";
function HourlyForecast({
  hfData,
  tempStatus,
  dispatch,
  weekDays,
  isOpenDropDowns,
}) {
  const [selectDay, setSelectDay] = useState(0);
  const [selectStatus, setSelectStatus] = useState("");

  const handleTurnOffSelectStatus = () => setSelectStatus("");
  const handleTurnOnSelectStatus = () => setSelectStatus("loading");
  const handleSelectDay = (dayIndex) => {
    setSelectDay(dayIndex);
    dispatch({ type: "openDropDown", payload: null });
    handleTurnOnSelectStatus();
  };

  useEffect(
    function () {
      if (!isOpenDropDowns) return;
      const callBack = (e) =>
        e.key === "Escape" && dispatch({ type: "openDropDown", payload: null });
      document.addEventListener("keydown", callBack);
      return () => document.removeEventListener("keydown", callBack);
    },
    [isOpenDropDowns, dispatch]
  );
  useEffect(
    function () {
      if (!hfData) return;
      dispatch({ type: "getWeekDays", payload: Object.entries(hfData) });
    },
    [hfData, dispatch]
  );
  useEffect(
    function () {
      setTimeout(handleTurnOffSelectStatus, 500);
    },
    [selectStatus]
  );
  return (
    <div className="hf">
      <div className="hf__title">
        <h4>Hourly Forecast</h4>
        <Button
          className="btn hf-btn"
          style={{
            backgroundColor: "var(--neutral-600)",
            color: "var(--neutral-200)",
            padding: "0.6rem 1rem",
            fontSize: "0.8rem",
            borderColor: "var(--neutral-600)",
          }}
          onClick={() => dispatch({ type: "openDropDown", payload: 2 })}
        >
          {!selectStatus && weekDays && <span>{weekDays?.[selectDay]}</span>}
          <i
            className={`bi bi-caret-${
              isOpenDropDowns === 2 ? "up" : "down"
            }-fill icon units-icon`}
          ></i>
        </Button>
        {isOpenDropDowns === 2 && (
          <DropDownList customStyle={{ top: "2.5rem", left: "9rem" }}>
            {weekDays?.map((weekDay, i) => (
              <DropDownListItem
                onClick={() => i !== selectDay && handleSelectDay(i)}
                className={i === selectDay ? "select" : ""}
                key={i}
              >
                {weekDay}
              </DropDownListItem>
            ))}
          </DropDownList>
        )}
      </div>
      <ul className="hf__list">
        {hfData &&
          Object.entries(hfData)?.[selectDay][1].map(
            (data, i) =>
              i > 0 && (
                <HourlyForecastItem
                  data={data}
                  now={i === new Date().getHours()}
                  tempStatus={selectStatus || tempStatus}
                  key={i}
                />
              )
          )}
        {hfData && (
          <HourlyForecastItem
            data={Object.entries(hfData)[0][1][0]}
            now={0 === new Date().getHours()}
            tempStatus={selectStatus || tempStatus}
          />
        )}
      </ul>
    </div>
  );
}

export default HourlyForecast;
