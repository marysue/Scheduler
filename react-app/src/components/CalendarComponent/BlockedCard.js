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
    height: "150px",
    // width: "150px",
    // height: "150px",
    //display: "grid",
    backgroundColor: "#616161",
    color: "white",
    // padding: "2px",
    borderRadius: "4px",
    // padding: "10px",
    // paddingRight: "0px",
    // margin: "0px",
    // marginRight: "0px",
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

export default function BlockedCard({datesBlocked, placementDates, day, handleDateClicked}) {

    const classes = useStyles();
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
    const bull = <span className={classes.bullet}>•</span>;

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
const testHandler = (e, day) => {
    alert('TestHandler clicked');
}
if (day) {
  return (
    <Card className={classes.root}>
      <CardContent onClick={ (e) => handleDateClicked(e, day)}>
        <div>{day.format("D").toString()}</div>
        <img src="blocked.png" alt="Blocked Day"></img>
      </CardContent>
    </Card>
    // <div onClick={ (e) => handleDateClicked(e, day)}>{day.format("D").toString()}</div>
  );
} else { return null }
}
