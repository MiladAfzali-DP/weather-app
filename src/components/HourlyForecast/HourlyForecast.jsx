import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";
import "./HourlyForecast.css";
import DropDownList from "../DropDownList/DropDownList";
import DropDownListItem from "../DropDownListItem/DropDownListItem";
function HourlyForecast({ hfData, tempStatus, dispatch, weekDays }) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectDay, setSelectDay] = useState(0);
  const [selectStatus, setSelectStatus] = useState("");

  const handleTurnOffSelectStatus = () => setSelectStatus("");
  const handleTurnOnSelectStatus = () => setSelectStatus("loading");
  const handleIsOpenDropDown = () => setIsOpenDropDown((isOpen) => !isOpen);
  const handleSelectDay = (dayIndex) => {
    setSelectDay(dayIndex);
    setIsOpenDropDown(false);
    handleTurnOnSelectStatus();
  };

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
            width: "6rem",
            height: "2rem",
            fontSize: "0.8rem",
          }}
          onClick={handleIsOpenDropDown}
        >
          {!selectStatus && weekDays && (
            <>
              <span>{weekDays?.[selectDay]}</span>
              <i
                className={`bi bi-caret-${
                  isOpenDropDown ? "up" : "down"
                }-fill icon units-icon`}
              ></i>
            </>
          )}
        </Button>
        {isOpenDropDown && (
          <DropDownList customStyle={{ top: "2.5rem", left: "9rem" }}>
            {weekDays?.map((weekDay, i) => (
              <DropDownListItem
                onClick={() => i !== selectDay && handleSelectDay(i)}
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
