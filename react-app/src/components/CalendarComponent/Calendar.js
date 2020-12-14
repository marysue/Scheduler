import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import { v4 as uuidv4 } from 'uuid';
import buildCalendar from './build';

export default function Calendar({datesBlocked, setDatesBlocked}) {
  console.log("Entered calendar ...");
  const [calendar, setCalendar] = useState([]);
  const [datesSelected, setDatesSelected] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [dateRange, setDateRange] = useState({ 'start': '', 'end':''})

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate]);

  useEffect( () => {


  }, []);

  function isSelected(day) {
    if (dateRange.start !== '') {
      const start = dateRange.start;
      const end = dateRange.end;
      const currentDay = day.format();

      //console.log(`Start: ${start}  End:  ${end}    CurrentDay: ${currentDay}`);
      // console.log(`currentDay.isBefore(${start}) : ${moment(currentDay).isBefore(start)}`);
      // console.log(`currentDay: (${currentDay} === ${start} || ${currentDay} === ${end}) ${moment(currentDay).isAfter(start) && moment(currentDay).isBefore(end)}`);

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
    if (isSelected(day) || dayInBlocked(day)) {
        //Once I figure out how to compare dates
        //compare blocked dates to this day, and if
        //in blocked dates, also return "selected"
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
  const addDateToBlocked = (day) => {

    if (!dayInBlocked(day)) {
      let blocked = [ ...datesBlocked];
      blocked.push(day.format());
      setDatesBlocked(blocked);
    }

  }

  const removeDateBlocked = (day) => {
      let found = false;
      for (let i=0; i < datesBlocked.length; i++) {
        let [month, date, year]    = new Date(datesBlocked[i]).toLocaleDateString("en-US").split("/")
        const newMoment = moment.utc([year, month - 1, date]);
        if (newMoment.isSame(day, 'day')) {
          //I have index of the day, now remove it
          let newBlocked = [ ...datesBlocked]
          newBlocked.splice(i, 1);
          setDatesBlocked(newBlocked);
          found = true;
        }
      }
      if (!found) {
        console.log("Failed to remove ", day.format('MM/DD/YY'), " from ", datesBlocked)
      }
  }


  const unsetDateBlocked = (day) => {
    for (let i = 0; i < datesBlocked.length; i++) {
      if (day.isSame(datesBlocked[i])) {
        console.log("We matched on a date blocked")
      }
    }
  }

  function dayInBlocked(day) {
    for (let i=0; i < datesBlocked.length; i++) {
      console.log("datesBlocked[", i, "]: ", datesBlocked[i], " and datesBlocked.length: ", datesBlocked.length);
      let [month, date, year]    = new Date(datesBlocked[i]).toLocaleDateString("en-US").split("/")
      const newMoment = moment.utc([year, month - 1, date]);
      if (newMoment.isSame(day, 'day')) {
        return true;
      }
    }
    return false;
  }

  const addDateRangeToBlocked = () => {
    if (dateRange.start !== undefined && dateRange.end !== undefined) {
      addDateToBlocked(dateRange.start);
      //Get 5 days from today:
      //var startdate = moment("2020-12-10");
      //new_date = moment(startdate, "DD-MM-YYYY").add('days', 5);

      //Get difference in days:
      //var a = moment([2007, 0, 29]);
      //var b = moment[2007, 0, 28]);
      //a.diff(b, 'days');  // => 1

      const diff = dateRange.start.diff(dateRange.end, 'days');
      console.log("difference: ", diff);

      if (diff > 1) {
        for (let i=1; i < diff - 1; i++) {
          let tmpDay = dateRange.start;
          tmpDay.add(i, 'day');
          console.log("Next day is:  ", tmpDay.format('MM/DD/YYYY'));
          addDateToBlocked(tmpDay);
        }
        addDateToBlocked(dateRange.end);
        console.log("New blocked dates:  ", datesBlocked);
      }
    }
  }

  function handleDateClicked(e, day) {
    if (dayInBlocked(day)) {
      removeDateBlocked(day);
      console.log("Removed:  ", datesBlocked)

    }
    if (day < moment(new Date()).startOf("day")) {
      console.log("Day selected was less than today. Just returning out of click handler");
       return;
    }
     if (dateRange.start === undefined) {
      setDateRange({'start': day.format(), 'end': day.format()});

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
    addDateToBlocked(day);
    const newArr = [ ...datesSelected, day.format() ];
    setDatesSelected(newArr);
    console.log("Dates selected:  ", datesSelected)
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
