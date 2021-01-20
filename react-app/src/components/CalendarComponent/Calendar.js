import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import Header from "./header";
import { v4 as uuidv4 } from 'uuid';
import buildCalendar from './build';
import DayCard from './DayCard';
import BlockedCard from './BlockedCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { setBlocked, getAllBlocked } from '../../store/blocked';
import { setContractorId } from '../../store/contractor';
import {setCompanyId} from '../../store/company';
import { setUserType } from '../../store/authentication';
import {  getAllAgencyCalendarInfo, getContractorPlacementCalendar, getCompanyPlacementCalendarInfo, setPlacementDates } from "../../store/placement";
import { baseUrl } from '../../config';
import { createBlocked } from '../../store/blocked';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'grid',
      backgroundColor: 'primary',
      gridColumnStart: '1',
      gridColumnEnd: '7',
      gridTemplateColumns: "repeat(7, 150px)",
      borderRadius: "4px",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
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
    },
  }));


export default function Calendar () {
  console.log("**********Calendar: Loading component ...***********")
  const dispatch = useDispatch();
  const classes = useStyles();
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  const userType = useSelector( state => state.authentication.userType);
  const contractorId = useSelector(state => state.contractor.contractorId);
  const blockedDates = useSelector(state=>state.blocked.blocked);
  const companyId = useSelector(state=>state.company.companyId);
  //let blockedDates = [];
  const placementDates = useSelector(state=>state.placement.placementDates);

  useEffect(() => {
    let cid;
    if (!userType) {
      const user = window.localStorage.getItem("userType");
      dispatch(setUserType(user));
      if (user === 'contractor' && !contractorId) {
         cid = window.localStorage.getItem("contractorId");
         dispatch(setContractorId(cid));
      } else if (user === 'company') {
        cid = window.localStorage.getItem("companyId");
        dispatch(setCompanyId(cid));
      }
    }
    if (userType === 'contractor') { getBlockedDates(contractorId); }
    setCalendar(buildCalendar(selectedDate));
    setPlacementCalendarInfo();
  }, [userType, contractorId, selectedDate]);

  async function getBlockedDates(cid) {
    //We only get blocked dates for contractor
    const bd = await getAllBlocked(cid);

    //Now change this into an array of dates only
    if (!bd.errors) {
          let bda = bd["blockedDates"]
          console.log("Calendar getBlockedDates:  Received bd from backend:  ", bda.length);
          const blockedArr = []
          for (let i = 0; i < bda.length; i++) {
              const date = bda[i].blocked.replace(" GMT", "")
              blockedArr.push(moment(date).local());
          }
          console.log("Calendar:  getBlockedDates: contractorId: ", contractorId, " blockedArr length: ", blockedArr.length);
          dispatch(setBlocked(blockedArr));
          console.log("Calendar:  getBlockedDates: Blocked array:  ", blockedArr);
    }
  }

  //Backend calls to retrieve the calendar information
  //Sets the Redux store
  async function setPlacementCalendarInfo() {
    if (userType === 'contractor') {
      const pd = await getContractorPlacementCalendar(contractorId);
      if (!pd.errors) {
          // console.log("I'm a contractor.  Placements length = ", pd.length);
          // console.log("placement dates:  ", pd);
          dispatch(setPlacementDates(pd));
      } else {
          console.log("Calendar: Error with getContractorPlacementCalendar fetch call");
      }

  } else if (userType === 'agency') {
    const pd = await getAllAgencyCalendarInfo();
    if (!pd.errors) {
      dispatch(setPlacementDates(pd));
    } else {
      console.log("Error setting placement calendar info for agency");
    }
  } else if (userType === 'company') {
    const pd = await getCompanyPlacementCalendarInfo(companyId);
    if (!pd.errors) {
      dispatch(setPlacementDates(pd));
    } else {
      console.log("Calendar: Error setting placement calendar info for company");
    }
  }
}

  function dayInPlacements(day) {
    const dayStr = day.format('YYYY-MM-DD')

    if (placementDates && dayStr in placementDates) {
      return true;
    } else {
      return false;
    }

  }

  const printDatesArray = (da) => {
    for (let i = 0; i < da.length; i++) {
      console.log("Calendar:", da[i])
    }
  }
  const addDateToBlocked = (start) => {
    //printDatesArray(blockedDates);
    if (!dayInBlocked(start)) {
      blockedDates.push(start);
      dispatch(setBlocked([...blockedDates]));
      // printDatesArray(blockedDates);
    }
  }
  const removeDateBlocked = (day) => {
      let found = false;

      for (let i=0; i < blockedDates.length; i++) {
        if (moment(day).isSame(blockedDates[i], 'day')) {
          let newBlocked = [ ...blockedDates]
          newBlocked.splice(i, 1);
          found = true;
          setBlocked(newBlocked);
         // dispatch(setPlacementDates([...newBlocked]));
          // printDatesArray(blockedDates);
          break;
        }
      }

      if (!found) {
        console.log("Calendar: Failed to remove ", day.format('MM/DD/YY HH:mm:ss'), " from ", blockedDates)
      }
  }
  function dayInBlocked(day) {
    //console.log("Calendar: dayInBlocked: blockedDates:  ", blockedDates);
    let thisDay = moment(day).local()
    if (blockedDates) {
      for (let i=0; i < blockedDates.length; i++) {
        if (thisDay.isSame(blockedDates[i].local(), 'day')) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  function handleDateClicked(e, day) {
    // printDatesArray(blockedDates)
    const today = moment().local();
    if (day.local() >= today.startOf('day')) {
      if (!dayInPlacements(day.local())) {
        if (!dayInBlocked(day.local())) {
          addDateToBlocked(day.local())
        } else if (dayInBlocked(day.local())) {
          removeDateBlocked(day.local());
        }
      } else {
        console.log("Calendar: Placement found for that date. Cannot block.")
      }
    } else {
      console.log("Calendar: Today endOf day compared with day is:  ", (day >= today.startOf('day')));
    }
  }
  const saveDates = async () => {
    const blocked = await createBlocked(contractorId, blockedDates)
    if (!blocked.errors) {
        console.log("Calendar: saved blocked dates to redux store")
    } else {
        console.log("Calendar: Error setting dates blocked to backend.")
    }
}
  return (
      <>
        <div style={{alignItems:"center"}}>
          {userType === 'contractor' ? <p>View your assignments, or double click a date to block it from receiving assignments.</p> : null }
        <Grid container width="1040px">

            <Grid item xs={12} >
                <div className="calendar">
                  <Header value={selectedDate} onChange={setSelectedDate} />
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
                              <DayCard key={di+"day"} placementDates={placementDates} handleDateClicked={handleDateClicked} day={day} userType={userType}></DayCard> }
                          </Grid>
                  )
                })}
              </>
            )})}
          </Grid>
          { userType === 'contractor' ?
                    <Button onClick={saveDates} style={{backgroundColor: "#648dae", color: "white", marginTop:"5px"}}>SAVE</Button> : null }
      </div>
    </>
  );
}
