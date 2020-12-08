import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import { v4 as uuidv4 } from 'uuid';
import buildCalendar from './build';

export default function Calendar() {
  console.log("Entered calendar ...");
  const [calendar, setCalendar] = useState([]);
  const [datesSelected, setDatesSelected] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [dateRange, setDateRange] = useState({ 'start': '', 'end':''})

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate]);

  function isSelected(day) {
    //new
    //
    if (dateRange.start != '') {
      const start = dateRange.start;
      const end = dateRange.end;
      const currentDay = day.format();

      // console.log(`Start: ${start}  End:  ${end}    CurrentDay: ${currentDay}`);
      // console.log(`currentDay.isBefore(${start}) : ${moment(currentDay).isBefore(start)}`);

      console.log(`currentDay: (${currentDay} === ${start} || ${currentDay} === ${end}) ${moment(currentDay).isAfter(start) && moment(currentDay).isBefore(end)}`);
      const inRange = moment(currentDay).isAfter(start) && moment(currentDay).isBefore(end)
      const isBorderDate = currentDay === end || currentDay === start;

      return(inRange || isBorderDate)
      // console.log("currentDay:  ", currentDay);
      // console.log(`currentDay.isBefore(${end}) is : ${moment(currentDay).isBefore(end)}`);
      // console.log(`currentDay.isAfter(${start}) is : ${moment(currentDay).isAfter(start)}`)

      //return (currentDay && (!currentDay.isBefore(start) && !currentDay.isAfter(end)))
    //   if (moment(currentDay).isBefore(end) && moment(currentDay).isAfter(start)) {
    //     return false;
    //   } else {
    //     return true;
    // }
  }

    //
    //
    //return datesSelected.includes(day.format())
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day) {
    if (isSelected(day)) {
        return "selected";
    }

    if (beforeToday(day)) {
      return "before";
    }

    if (isToday(day)) {
      return "today";
    }
    return "";
  }

  // function currMonthName() {
  //   return value.format("MMMM");
  // }

  // function currYear() {
  //   return value.format("YYYY");
  // }

  function handleDateClicked(e, day) {
    console.log("Need to figure out what date was clicked:  ", day.format());
    console.log("Received e.nativeEvent.shiftKey: ", e.nativeEvent.shiftKey);
    if (day < moment(new Date()).startOf("day")) return;

    if (dateRange.start === '') {
       dateRange.start = day.format();
       dateRange.end = day.format();
    }

    if (e.nativeEvent.shiftKey) {
        if (day.format() > dateRange.start) {
                dateRange.end = day.format()
        } else if (day.format() < dateRange.start) {
                 dateRange.end = dateRange.start;
                 dateRange.start = day.format();
        }
      } else {
        dateRange.start = day.format();
        dateRange.end = day.format();
      }

    console.log("Date range is:  ", dateRange);

    const newArr = [ ...datesSelected, day.format() ];
    setDatesSelected(newArr);
    console.log("Dates selected:  ", datesSelected);
  }

  return (
    <div className="calendar">
      <Header value={selectedDate} onChange={setSelectedDate} />

      <div className="body">
        <div className="day-names">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => {
            const uuid = uuidv4();
            return (<div className="week"  key={uuid}>{d}</div>)
          })}
        </div>
        {calendar.map((week, wi) => {
          const uuid = uuidv4();
           wi = wi+uuid;

          return (
          <div key={wi}>
            {week.map((day, di) => {
              di = di+uuid;
              return (
              <div
                key={day.format()}
                className="day"
                onClick={(e) => {handleDateClicked(e,day)}}
              >
                 <div className={dayStyles(day)}>
                   {day.format("D").toString()}
                 </div>
               </div>
            )
          })}
          </div>
        )})}
      </div>
    </div>
  );
}
