import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import moment from "moment";
import Header from "./header";
import { v4 as uuidv4 } from 'uuid';
import buildCalendar from './build';
import DayCard from './DayCard';
import BlockedCard from './BlockedCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
      maxWidth: "1054px",
      // flexBasis: "100%",
      display: 'grid',
      // gridAutoFlow: 'row',
      // gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      // margin: "0px",
      // padding: "0px",
    //   gridColumnGap: "0px",

    gridColumnStart: '1',
    gridColumnEnd: '7',
    gridTemplateColumns: "repeat(7, 150px)",
    borderRadius: "4px",
    // gridTemplateRows: "150px",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    //   width: '100%',
    //   height: '100%',
    },
    divider: {
    //   margin: theme.spacing(2, 0),
    },
  }));



export default function Calendar({datesBlocked, setDatesBlocked, userType}) {
  console.log("************************Calendar View************************")
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  // const [blockedDatesChanged, setBlockedDatesChanged] = useState(false);
  const classes = useStyles();
  //const userType = useSelector(state => state.authentication.userType)
  const placements = useSelector ( state => state.placement.placementInfo );
  const placementDates = useSelector(state => state.placement.placementDates);
  // console.log("Calendar: DatesBlocked: ", datesBlocked);
  // console.log("Calendar: placements: ", placements);
  // console.log("Calendar: placementDates: ", placementDates);

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate]);

  // function isSelected(day) {
  //   if (dateRange.start !== '') {
  //     const start = dateRange.start;
  //     const end = dateRange.end;
  //     const currentDay = day;

  //     const inRange = moment(currentDay).isAfter(start) && moment(currentDay).isBefore(end)
  //     const isBorderDate = moment(currentDay).isSame(end) || moment(currentDay).isSame(start);

  //     return(inRange || isBorderDate)
  //   }
  // }
  function dayInPlacements(day) {
    console.log("Calendar: day = ", day.format('YYYY-MM-DD'));
    const dayStr = day.format('YYYY-MM-DD')


    if (dayStr in placementDates) {
      console.log("Calendar: dayInPlacements: Found ", dayStr, " in placementDates");
      return true;
    } else {
      console.log("Did not find ", dayStr, " in placementDates")
      return false;
    }

    // for (let i=0; i < placementDates.length; i++) {
    //    if (moment(day).local().isSame(placementDates[i], 'day')) {
    //      return true;
    //    }
    //   }
    // return false;

  }
  // function beforeToday(day) {
  //   return moment(day).isBefore(new Date(), "day");
  // }
  // function isToday(day) {
  //   return moment(new Date()).isSame(day, "day");
  // }
  // function dayStyles(day) {
  //   //if (isSelected(day) || dayInBlocked(day)) {
  //     if (dayInBlocked(day)) {
  //       return "selected";
  //   }

  //   if (dayInPlacements(day)) {
  //     return "placement";
  //   }

  //   if (beforeToday(day)) {
  //     return "before";
  //   }

  //   if (isToday(day)) {
  //     return "today";
  //   }
  //   return "";
  // }
  // function currMonthName() {
  //   return value.format("MMMM");
  // }
  // function currYear() {
  //   return value.format("YYYY");
  // }
  const printDatesArray = (da) => {
    console.log("NewCalendar: printDatesArray(day)");
    for (let i = 0; i < da.length; i++) {
      // console.log(da[i].format("MM/DD/YYYY"))
      console.log(da[i])
    }
  }
  const addDateToBlocked = (start) => {
    console.log("NewCalendar:  addDateToBlocked(start)");
    // console.log("Adding ", start.format('MM/DD/YYYY'));
    // console.log("Before adding: ");
    printDatesArray(datesBlocked);
    if (!dayInBlocked(start)) {
      let blocked = [ ...datesBlocked];
      blocked.push(start);
      setDatesBlocked(blocked);
      // setBlockedDatesChanged(true);
      // console.log("After adding date to blocked: ")
     //printDatesArray(datesBlocked);
    }

  }
  const removeDateBlocked = (day) => {
    console.log("NewCalendar: removeDateBlocked(day)");
      let found = false;

      for (let i=0; i < datesBlocked.length; i++) {
        if (moment(day).isSame(datesBlocked[i], 'day')) {
          console.log("Found : ", day.format("MM/DD/YYYY HH:mm:ss"));
          let newBlocked = [ ...datesBlocked]
          newBlocked.splice(i, 1);
          found = true;
          console.log(" Contents of newBlocked array after splice:  ");

          setDatesBlocked([...newBlocked]);
          printDatesArray(datesBlocked);
          // setBlockedDatesChanged(true);
          break;
        }
      }
      // latency issue - datesBlocked won't be updated until component is remapped???
      // console.log("removeDateBlocked:  Updated datesBlocked array:  ");
      // for (let i=0; i < datesBlocked.length; i++) {
      //   console.log("     ", datesBlocked[i].format('MM/DD/YYYY'))
      // }


      if (!found) {
        console.log("Failed to remove ", day.format('MM/DD/YY HH:mm:ss'), " from ", datesBlocked)
      }
  }
  function dayInBlocked(day) {
    // console.log("NewCalendar: dayInBlocked(day) ");
    let thisDay = moment(day).local()
    // console.log("This day:  ")
    // console.log("     ",  thisDay.format('MM/DD/YY hh:mm:ss'));

    for (let i=0; i < datesBlocked.length; i++) {
      // console.log("datesBlocked[", i, "]: ", datesBlocked[i].format('MM/DD/YY HH:mm:ss'));
      // console.log("datesBlocked[i].local(): ", datesBlocked[i].local().format('MM/DD/YY HH:mm:ss'));
      //console.log("Calendar: dayInBlocked(", day.format("MM/DD/YYYY"), " matches: ", datesBlocked[i].format("MM/DD/YYYY"), " : ", moment(day).isSame(datesBlocked[i], 'day'));
      // console.log("datesBlocked[i] is a ", (typeof datesBlocked[i]));
       if (thisDay.isSame(datesBlocked[i].local(), 'day')) {
         return true;
       }
      }
    return false;
  }
  // const addDateRangeToBlocked = (start, end) => {
  //   //Only execute this function if the local state dateRange start and end have values
  //   console.log("addDateRangeToBlocked: ", start.format('MM/DD/YYYY'), " to ", end.format('MM/DD/YYYY'));
  //   if (start !== '' && end !== '') {
  //     addDateToBlocked(start);

  //     const diff = start.diff(end, 'days');
  //     console.log("Calendar: addDateRangeToBlocked: difference: ", diff);

  //     if (diff > 1) {
  //       for (let i=1; i < diff - 1; i++) {
  //         let tmpDay = start;
  //         tmpDay.add(i, 'day');
  //         console.log("Calendar: addDateRangeToBlocked: Next day is:  ", tmpDay.format('MM/DD/YYYY'));
  //         addDateToBlocked(tmpDay);
  //       }
  //       addDateToBlocked(end);
  //       console.log("Calendar: addDateRangeToBlocked: New blocked dates:  ", datesBlocked);
  //     }
  //   }
  // }
  // function removeRangeFromBlocked(start, end) {
  //   let thisDay = start;
  //   while (!moment(thisDay).isSame(end, 'day')) {
  //     removeDateBlocked(thisDay)
  //     thisDay = moment(thisDay).add(1, 'days');
  //   }
  //   removeDateBlocked(thisDay) //remove the end date
  // }
  function handleDateClicked(e, day) {
    console.log("NewCalendar: handleDateClicked");
    console.log("Day is: ", day)
    printDatesArray(datesBlocked)
    const today = moment().local();
    if (day.local() >= today.startOf('day')) {
      if (!dayInPlacements(day.local())) {
        if (!dayInBlocked(day.local())) {
          addDateToBlocked(day.local())
        } else if (dayInBlocked(day.local())) {
          removeDateBlocked(day.local());
        }
      } else {
        console.log("Placement found for that date. Cannot block.")
      }
    } else {
      console.log("Today endOf day compared with day is:  ", (day >= today.startOf('day')));
    }
  }

  return (
      <>
        <div >
        <Grid  style={{color: "white", maxWidth: "1050px"}}  >
            <Grid item xs={12}>
                <div className="calendar">
                  <Header value={selectedDate} onChange={setSelectedDate}/>
                </div>
            </Grid>
          </Grid>
          <Grid container alignItems="center"  style={{color: "white", backgroundColor: "#616161", maxWidth: "1048px", marginBottom:"5px"}} className={classes.container}  spacing={1}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => {
                const uuid = uuidv4();
                return (
                  <Grid item className="week"  key={uuid}>
                    <div>
                      <center ><h2 >{d}</h2></center>
                      </div>
                  </Grid>
                )
              })}
          </Grid>
          <Grid container className={classes.container} spacing={1}>
            {calendar.map((week, wi) => {
            const uuid = uuidv4();
            wi = wi+uuid;

            return (
              <>

                { week.map((day, di) => {
                  di = di+uuid;
                  return (
                          <Grid item key={di}>
                            {  dayInBlocked(day) ?
                              <BlockedCard key={di+"blocked"} handleDateClicked={handleDateClicked} day={day}></BlockedCard> :
                              <DayCard key={di+"day"} placements={placements} placementDates={placementDates} handleDateClicked={handleDateClicked} day={day} userType={userType}></DayCard> }
                          </Grid>
                  )
                })}
              </>
            )})}
          </Grid>
      </div>
    </>

  );
}
