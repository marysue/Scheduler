import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BlockedImg from '../../images/blocked.png';

const useStyles = makeStyles({
  root: {
    width: "145px",
    height: "100px",
    // width: "150px",
    // height: "150px",
    //display: "grid",
    backgroundColor: "#648dae",
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


if (day) {
  return (
    <Card className={classes.root}>
      <CardContent onClick={ (e) => handleDateClicked(e, day)}>
        <div>{day.format("D").toString()}</div>
        <img src={BlockedImg} alt="Blocked Day"></img>
      </CardContent>
    </Card>
  );
} else { return null }
}
