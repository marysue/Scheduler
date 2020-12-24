import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
let once = true
export default function DayCard({ day, handleDateClicked, userType}) {
  const placements = useSelector ( state => state.placement.placementInfo );
  const placementDates = useSelector(state => state.placement.placementDates);
  // console.log("Calendar: placements: ", placements);
  // console.log("Calendar: placementDates: ", placementDates);

    const classes = useStyles();

    function dayInPlacements(day) {
      const dayStr = day.format('YYYY-MM-DD')

      if (placementDates) {
        if (dayStr in placementDates) {
          return true;
        } else {
          return false;
        }
      }
    }

      function beforeToday(day) {
        //console.log("DayCard: beforeToday(day)");
        return moment(day).local().isBefore(new Date(), "day");
      }

    // const bull = <span className={classes.bullet}>•</span>;

const getPlacementInfo = (day) => {
    let dayArray = placementDates[day.format('YYYY-MM-DD')].map((item, index) => {
          return(`<div key={${index}}>{${item.companyInfo.companyName}}</div>`)
      })
      let retVal = ""
      for (let i = 0 ; i < dayArray.length; i++) {
        retVal += dayArray[i]
      }
      return retVal
}

if (!day) {
  return null
 } else if (beforeToday(day)) {
    return (
    <Card className={classes.before}>
      <CardContent>
        <div>{day.format("D").toString()}</div>
          { dayInPlacements(day) && userType==="contractor"  ? placementDates[day.format('YYYY-MM-DD')].map((item, index) => {
          return(<div key={index}>{item.companyInfo.companyName}:{item.companyInfo.name}</div>)}) : null }
          { dayInPlacements(day) && userType==="company" ? placementDates[day.format('YYYY-MM-DD')].map((item, index) => {
          return(<div key={index}>{item.contractorInfo.name}:{item.contractorInfo.staffType}</div>)}) : null }
          { dayInPlacements(day) && userType==='agency' ? placementDates[day.format('YYYY-MM-DD')].map((item,index) => {
          return(<div key={index}>{item.contractorInfo.name}:{item.contractorInfo.staffType}</div>)}) : null }
      </CardContent>
    </Card>
    )
  } else {
  return (
    <Card key={"cardKey" } className={classes.root}>
      <CardContent key={"cardContent"} onClick={ (e) => handleDateClicked(e, day)}>
        <div key={day.format("D").toString()} >{day.format("D").toString()}</div>

      { dayInPlacements(day) && userType==="contractor"  ? placementDates[day.format('YYYY-MM-DD')].map((item, index) => {
          return(<div key={index}>{item.companyInfo.companyName}:{item.companyInfo.name}</div>)}) : null }
      { dayInPlacements(day) && userType==="company" ? placementDates[day.format('YYYY-MM-DD')].map((item, index) => {
          return(<div key={index}>{item.contractorInfo.name}:{item.contractorInfo.staffType}</div>)}) : null }
      { dayInPlacements(day) && userType==='agency' ? placementDates[day.format('YYYY-MM-DD')].map((item,index) => {
          return(<div key={index}>{item.contractorInfo.name}:{item.contractorInfo.staffType}</div>)}) : null }
      </CardContent>
    </Card>
    // <div onClick={ (e) => handleDateClicked(e, day)}>{day.format("D").toString()}</div>
  );
  }
  }
