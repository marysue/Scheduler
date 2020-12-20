import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    gridColumnStart: 1,
    gridColumnEnd: -1,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));


export default function CalendarHeader({ value, onChange }) {
   const classes = useStyles();

  function currMonthName() {
    // console.log("Header : currMonthName()")
    return value.format("MMMM");
  }

  function currYear() {
    // console.log("Header : currYear()");
    return value.format("YYYY");
  }

  function prevMonth() {
    // console.log("Header : prevMonth()")
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    // console.log("Header : nextMonth()")
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    // console.log("Header : thisMonth()")
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
