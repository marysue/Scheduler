import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { requirePropFactory } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    width: "145px",
    height: "100px",
    backgroundColor: "#616161",
    color: "white",
    borderRadius: "4px",
  },
  before: {
    width: "145px",
    height: "100px",
    backgroundColor: "#C5C9Cb",
    color: "white",
    borderRadius: "4px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
  },
});

export default function DayCard({datesBlocked, placements, placementDates, day, handleDateClicked}) {

    const classes = useStyles();
    function dayInPlacements(day) {

      if (placementDates) {
        for (let i=0; i < placementDates.length; i++) {
          //  console.log("Comparing day: ", day.local().format('MM/DD/YY hh:mm:ss'), " with placement: ", placementDates[i].local().format('MM/DD/YY hh:mm:ss'));
           if (day.local().isSame(placementDates[i], 'day')) {
             return true;
           }
          }
          // console.log("DayCard:  dayInPlacements(", day.format('MM/DD/YY hh:mm:ss'), ") - returns false") //: Placement dates: ", placementDates)
         return false;
      } else {
          // console.log("No placementDates...");
      }

      }
      function beforeToday(day) {
        console.log("DayCard: beforeToday(day)");
        return moment(day).local().isBefore(new Date(), "day");
      }
      function isToday(day) {
        console.log("DayCard: isToday(day)");
        return moment(new Date()).isSame(day, "day");
      }
    // const bull = <span className={classes.bullet}>•</span>;
    function dayInBlocked(day) {
      // console.log("DayCard: dayInBlocked(day)")

        for (let i=0; i < datesBlocked.length; i++) {
          //console.log("Calendar: dayInBlocked(", day.format("MM/DD/YYYY"), " matches: ", datesBlocked[i].format("MM/DD/YYYY"), " : ", moment(day).isSame(datesBlocked[i], 'day'));
          // console.log("datesBlocked[i] is a ", (typeof datesBlocked[i]));
           if (moment(day).isSame(datesBlocked[i], 'day')) {
             return true;
           }
          }
        return false;
      }
    function dayStyles(day) {
      // console.log("DayCard: dayStyles(day)");
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
    function placementIndex(day) {
      for (let i=0; i<placements.length; i++) {
        const start = moment(placements[i].startDate)
        const end = moment(placements[i].endDate)
        // console.log("looking at startDate: ", start.format('MM/DD/YY HH:mm:ss'), " is same as day: ", day.format('MM/DD/YY HH:mm:ss'));
        if ( (day.local().isBefore(end.local(), "day") && day.isAfter(start.local(), "day")) ||
            (start.local().isSame(day) || end.local().isSame(day))) {
          return i;
      }
    }
      return -1;
    }

    function isInPlacements(day) {
      if (placementIndex(day) >= 0) {
        return true;
      } else {
        return false;
      }
    }


const testHandler = (e, day) => {
    alert('TestHandler clicked');
}
if (!day) {
  return null
 } else if (beforeToday(day)) {
    return (
    <Card className={classes.before}>
      <CardContent>
        <div>{day.format("D").toString()}</div>
        { isInPlacements(day) ?
          <div>{placements[placementIndex(day)].companyName}</div> : null }
      </CardContent>
    </Card>
    )
  } else {
  return (
    <Card key={"cardKey" } className={classes.root}>
      <CardContent key={"cardContent"} onClick={ (e) => handleDateClicked(e, day)}>
        <div key={day.format("D").toString()} >{day.format("D").toString()}</div>
        { dayInPlacements(day) && placementIndex(day) >= 0 ?
          <div key={placementIndex(day)}>{placements[placementIndex(day)].companyName}</div> : null }
      </CardContent>
    </Card>
    // <div onClick={ (e) => handleDateClicked(e, day)}>{day.format("D").toString()}</div>
  );
  }
  }
