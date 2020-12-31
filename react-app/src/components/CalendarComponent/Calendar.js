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

      // flexBasis: "100%",
      display: 'grid',
      backgroundColor: 'primary',
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
    week: {
      backgroundColor: "#648dae",
      padding: "0px",
    },
    item: {
      padding: "0px",
    },
    h2: {
      width:"inherit",
      margin:"0px",
    }
  }));


export default function Calendar({datesBlocked, setDatesBlocked, placements, placementDates, userType}) {
  console.log("************************Calendar View************************")
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const classes = useStyles();


  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate]);

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

  }

  const printDatesArray = (da) => {
    for (let i = 0; i < da.length; i++) {
      console.log(da[i])
    }
  }
  const addDateToBlocked = (start) => {
    printDatesArray(datesBlocked);
    if (!dayInBlocked(start)) {
      let blocked = [ ...datesBlocked];
      blocked.push(start);
      setDatesBlocked([...blocked]);
      printDatesArray(datesBlocked);
    }

  }
  const removeDateBlocked = (day) => {
      let found = false;

      for (let i=0; i < datesBlocked.length; i++) {
        if (moment(day).isSame(datesBlocked[i], 'day')) {
          let newBlocked = [ ...datesBlocked]
          newBlocked.splice(i, 1);
          found = true;

          setDatesBlocked([...newBlocked]);
          printDatesArray(datesBlocked);
          break;
        }
      }

      if (!found) {
        console.log("Failed to remove ", day.format('MM/DD/YY HH:mm:ss'), " from ", datesBlocked)
      }
  }
  function dayInBlocked(day) {
    let thisDay = moment(day).local()
    if (datesBlocked) {
      for (let i=0; i < datesBlocked.length; i++) {
        if (thisDay.isSame(datesBlocked[i].local(), 'day')) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  function handleDateClicked(e, day) {
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

        <Grid container width="1040px">

            <Grid item xs={12} >
                <div className="calendar">
                  <Header value={selectedDate} onChange={setSelectedDate}/>
                </div>
            </Grid>
          </Grid>
          <Grid container alignItems="center"  style={{width:"1046px", marginLeft:"inherit", color: "white",  backgroundColor:"#648dae", marginBottom:"5px"}} className={classes.container}  spacing={1}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => {
                const uuid = uuidv4();
                return (
                  <Grid item style={{padding:"0px"}} key={uuid} >
                    <div>
                      <center><h2>{d}</h2></center>
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
