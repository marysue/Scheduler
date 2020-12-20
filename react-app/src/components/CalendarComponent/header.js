import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    gridColumnStart: 1,
    gridColumnEnd: -1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));


export default function CalendarHeader({ value, onChange }) {
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


      <div className="header" width="1050px">
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
