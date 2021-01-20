import React from "react";

export default function CalendarHeader({ value, onChange }) {


  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    console.log("Selected prevMonth()");
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    console.log("Selected nextMonth");
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    return value.isSame(new Date(), "month");
  }

  return (


      <div className="header">
        <div
          className="previous"
          onClick={() => !thisMonth() && onChange(prevMonth())}
        >
          <h1>{!thisMonth() ? String.fromCharCode(171) : null}</h1>
        </div>
        <div className="current">
          <h1>{currMonthName()} {currYear()}</h1>
        </div>
        <div className="next" onClick={() => onChange(nextMonth())}>
          <h1>{String.fromCharCode(187)}</h1>
        </div>
      </div>


  );
}
