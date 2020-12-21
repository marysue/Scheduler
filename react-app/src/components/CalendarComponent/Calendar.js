import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import { v4 as uuidv4 } from 'uuid';
import buildCalendar from './build';
import DayCard from './DayCard';


export default function Calendar({datesBlocked, placementDates, setDatesBlocked, }) {
  console.log("*****************************Calendar: Entered calendar****************************");
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [dateRange, setDateRange] = useState({ 'start': '', 'end':''})
  const [blockedDatesChanged, setBlockedDatesChanged] = useState(false);

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate]);

  function isSelected(day) {
    if (dateRange.start !== '') {
      const start = dateRange.start;
      const end = dateRange.end;
      const currentDay = day;

      const inRange = moment(currentDay).isAfter(start) && moment(currentDay).isBefore(end)
      const isBorderDate = moment(currentDay).isSame(end) || moment(currentDay).isSame(start);

      return(inRange || isBorderDate)
    }
  }

  function dayInPlacements(day) {

    for (let i=0; i < placementDates.length; i++) {
       if (moment(day).isSame(placementDates[i], 'day')) {
         return true;
       }
      }
    return false;

  }
  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day) {
    //if (isSelected(day) || dayInBlocked(day)) {
      if (dayInBlocked(day)) {
        return "selected";
    }

    if (dayInPlacements(day)) {
      return "placement";
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

  const printDatesArray = (da) => {

    for (let i = 0; i < da.length; i++) {
      // console.log(da[i].format("MM/DD/YYYY"))
      console.log(da[i])
    }
  }
  const addDateToBlocked = (start) => {
    console.log("Adding ", start.format('MM/DD/YYYY'));
    console.log("Before adding: ");
    printDatesArray(datesBlocked);
    if (!dayInBlocked(start)) {
      let blocked = [ ...datesBlocked];
      blocked.push(start);
      setDatesBlocked(blocked);
      setBlockedDatesChanged(true);
      // console.log("After adding date to blocked: ")
     //printDatesArray(datesBlocked);
    }

}

  const removeDateBlocked = (day) => {
      console.log("removeDateBlocked:  removing : ", day.format("MM/DD/YYYY"), " from blocked ");
      let found = false;

      for (let i=0; i < datesBlocked.length; i++) {
        if (moment(day).isSame(datesBlocked[i], 'day')) {
          console.log("Found : ", day.format("MM/DD/YYYY"));
          let newBlocked = [ ...datesBlocked]
          newBlocked.splice(i, 1);
          found = true;
          console.log(" Contents of newBlocked array after splice:  ");

          setDatesBlocked([...newBlocked]);
          printDatesArray(datesBlocked);
          setBlockedDatesChanged(true);
          break;
        }
      }
      // latency issue - datesBlocked won't be updated until component is remapped???
      // console.log("removeDateBlocked:  Updated datesBlocked array:  ");
      // for (let i=0; i < datesBlocked.length; i++) {
      //   console.log("     ", datesBlocked[i].format('MM/DD/YYYY'))
      // }


      if (!found) {
        console.log("Failed to remove ", day.format('MM/DD/YY'), " from ", datesBlocked)
      }
  }


  function dayInBlocked(day) {

    for (let i=0; i < datesBlocked.length; i++) {
      //console.log("Calendar: dayInBlocked(", day.format("MM/DD/YYYY"), " matches: ", datesBlocked[i].format("MM/DD/YYYY"), " : ", moment(day).isSame(datesBlocked[i], 'day'));
      // console.log("datesBlocked[i] is a ", (typeof datesBlocked[i]));
       if (moment(day).isSame(datesBlocked[i], 'day')) {
         return true;
       }
      }
    return false;
  }

  const addDateRangeToBlocked = (start, end) => {
    //Only execute this function if the local state dateRange start and end have values
    console.log("addDateRangeToBlocked: ", start.format('MM/DD/YYYY'), " to ", end.format('MM/DD/YYYY'));
    if (start !== '' && end !== '') {
      addDateToBlocked(start);

      const diff = start.diff(end, 'days');
      console.log("Calendar: addDateRangeToBlocked: difference: ", diff);

      if (diff > 1) {
        for (let i=1; i < diff - 1; i++) {
          let tmpDay = start;
          tmpDay.add(i, 'day');
          console.log("Calendar: addDateRangeToBlocked: Next day is:  ", tmpDay.format('MM/DD/YYYY'));
          addDateToBlocked(tmpDay);
        }
        addDateToBlocked(end);
        console.log("Calendar: addDateRangeToBlocked: New blocked dates:  ", datesBlocked);
      }
    }
  }
  function removeRangeFromBlocked(start, end) {
    let thisDay = start;
    while (!moment(thisDay).isSame(end, 'day')) {
      removeDateBlocked(thisDay)
      thisDay = moment(thisDay).add(1, 'days');
    }
    removeDateBlocked(thisDay) //remove the end date
  }

  function handleDateClicked(e, day) {
    console.log("Day is: ", day)
    printDatesArray(datesBlocked)
    const today = moment();
    if (day >= today.startOf('day')) {
      if (!dayInPlacements(day)) {
        if (!dayInBlocked(day)) {
          addDateToBlocked(day)
        } else if (dayInBlocked(day)) {
          removeDateBlocked(day);
        }
      } else {
        console.log("Placement found for that date. Cannot block.")
      }
    } else {
      console.log("Today endOf day compared with day is:  ", (day >= today.startOf('day')));
    }
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
