import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DayCard from './DayCard';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: theme.spacing(3),
    width: '150px',
    height: '150px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    width: '150px',
    height: '150px',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default function GridComponent({day, handleDateClicked}) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Contractor Calendar
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={1}>
         <DayCard day={day} handleDateClicked={handleDateClicked}>1</DayCard>
        </Grid>
        <Grid item xs={1}>
         <DayCard  day={day} handleDateClicked={handleDateClicked}>2</DayCard>
        </Grid>
        <Grid item xs={1}>
          <DayCard  day={day} handleDateClicked={handleDateClicked}>3</DayCard>
        </Grid>
        <Grid item xs={1}>
          <DayCard  day={day} handleDateClicked={handleDateClicked}>4</DayCard>
        </Grid>
        <Grid item xs={1}>
        <DayCard  day={day} handleDateClicked={handleDateClicked}>5</DayCard>
        </Grid>
        <Grid item xs={1}>
        <DayCard  day={day} handleDateClicked={handleDateClicked}>6</DayCard>
        </Grid>
        <Grid item xs={1}>
        <DayCard  day={day} handleDateClicked={handleDateClicked}>7</DayCard>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />

    </div>
  );
}
