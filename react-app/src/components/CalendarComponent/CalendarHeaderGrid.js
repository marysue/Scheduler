import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from "./header";

export default function CalendarHeaderGrid({ value, onChange, selectedDate, setSelectedDate }) {
  const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "100%",
    display: 'grid',
    gridColumnStart: '1',
    gridColumnEnd: '3',
    gridTemplateColumns: "1fr 1fr 1fr",
    borderRadius: "4px",
  },
}));
const classes = useStyles();

  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    return value.isSame(new Date(), "month");
  }

  return (

    <Grid container alignItems="center"  style={{color: "white", maxWidth: "100%", marginBottom:"5px"}} className={classes.container}  spacing={1}>
        <Grid item justify="center" alignItems="stretch" direction="row" xs={12} >
            <div className="calendar">
              <Header value={selectedDate} onChange={setSelectedDate}/>
            </div>
        </Grid>
        <Grid item  direction="row" justify="center" alignItems="stretch" xs={4} >
          <div
            className="previous"
            onClick={() => !thisMonth() && onChange(prevMonth())}
            >
            <h1><center>{!thisMonth() ? String.fromCharCode(171) : null}</center></h1>
          </div>
        </Grid>
        <Grid item xs={4} >
          <div className="current">
            <h1>{currMonthName()} {currYear()}</h1>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="next" onClick={() => onChange(nextMonth())}>
            <h1><center>{String.fromCharCode(187)}</center></h1>
          </div>
        </Grid>
    </Grid>
  );
}
