import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
// import { Redirect } from 'react-router-dom';
import Calendar from './CalendarComponent/Calendar'
//import DatesBlocked from './DatesBlocked'
import { getAllBlocked, setBlocked, createBlocked } from '../store/blocked';
import { Button } from '@material-ui/core';
import { getCompanyPlacements } from '../store/placement';
import  CompanyPlacementTable  from './CompanyPlacementTable';
import NewCalendar from './CalendarComponent/NewCalendar';
import { setCompanyId } from '../store/company';

const CompanyView = () => {
    console.log("Entered CompanyView")
    const dispatch = useDispatch();
    const companyId = useSelector(state => state.company.companyId);
    const [placements, setPlacements] = useState([]);
    const [placementDates, setPlacementDates] = useState([]);

    function getDateRange(startDate, endDate) {
        let start = moment(startDate).local();
        let end = moment(endDate).local();
        // console.log("Local start date:  ", start.format('MM/DD/YY hh:mm:ss'))

        let diff = end.diff(start, 'days') + 1;
        let thisDay = start.local().format('MM/DD/YYYY');
        let range = [];
        range.push(start)
        for (let i = 1; i !== diff + 1; i++) {
            let tmpDay = moment(thisDay).local();
            range.push(tmpDay);
            thisDay = tmpDay.add(1, 'day').format('MM/DD/YYYY hh:mm:ss')
        }
        // for (let i = 0; i < range.length; i++) {
        //     console.log("range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'));
        // }
        return range;
    }

    useEffect (() => {
        if (!companyId) {
            let cid = window.localStorage.getItem("companyId");
            if (cid) {
             dispatch(setCompanyId(cid));
            }
        }
        (async() => {
            const placements = await getCompanyPlacements(companyId);
            if (!placements.errors) {
                let pl = placements["placements"]
                const placementArr = []
                for (let i = 0; i < pl.length; i++) {
                    // console.log("Received date blocked: ", pl[i].blocked)
                    const startDate = moment(pl[i].startDate.replace(" GMT", "")).format('MM/DD/YYYY HH:mm:ss')
                    const endDate = moment(pl[i].endDate.replace(" GMT", "")).format('MM/DD/YYYY HH:mm:ss')
                    const name = pl[i].contractor.name;
                    const email = pl[i].contractor.email;
                    const phone = pl[i].contractor.phone;
                    const city = pl[i].contractor.city;
                    const contractorId = pl[i].contractor.id
                    // console.log("date: ", date);
                    // console.log("Tranforming into moment: ", moment(date).format('MM/DD/YYYY HH:mm:ss'));
                    // console.log("Transforming into local : ", moment(pl[i].blocked).local());
                    placementArr.push({startDate, endDate, name, email, phone, city, contractorId});
                }
                console.log("Placement array in CompanyView: ")
                for (let i = 0; i < placementArr.length; i++) {
                    console.log("placementArr[", i, "]:  ", placementArr[i])
                }
                // setPlacements(placementArr);
            } else {
                console.log("CompanyView:  Error from getAllPlacements fetch call");
            }

            })();
    }, [companyId] )

    const savePlacement= async () => {
        console.log("save Placement to backend - needs to be implemented")
        //const placement = createPlacement(companyId, )
        //dispatch(setPlacement(placement));
    }

    if (!companyId) {
        console.log('Company Id is not set on login');
        return null
    } else {
        return (
            <>
                <NewCalendar key={"newCalendar"} placements={placements} datesBlocked={[]}></NewCalendar>
                {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
                <Button key={"buttonKey"} onClick={savePlacement} style={{backgroundColor: "#616161", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button>
                <CompanyPlacementTable key={"coPlacement"} placements={placements}></CompanyPlacementTable>
            </>
        );
    }
}

export default CompanyView;
