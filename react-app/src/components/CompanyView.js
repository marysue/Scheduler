import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { Button } from '@material-ui/core';
import  CompanyPlacementTable  from './CompanyPlacementTable';
import Calendar from './CalendarComponent/Calendar';
import { setCompanyId, setCompanyLocations, getCompanyInfo } from '../store/company';
import { getCompanyPlacementTableInfo, getCompanyPlacementCalendarInfo, setPlacementInfo, setPlacementDates } from '../store/placement';

const CompanyView = () => {
    console.log("Entered CompanyView")
    const dispatch = useDispatch();
    const companyId = useSelector(state => state.company.companyId);
    const placements = useSelector(state => state.placement.placementInfo);
    const placementDates = useSelector(state => state.placement.placementDates);
    const companyLocations = useSelector(state => state.company.companyLocations);
    console.log(" *********Entered Company View**************")

    // function printRange(message, range) {
    //     console.log(message);
    //     for (let i = 0; i < range.length; i++) {
    //         console.log("     range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'));
    //     }
    // }

    function getDateRange(startDate, endDate, pdArr) {

        let start = moment(startDate);
        let end = moment(endDate);

        let diff = end.diff(start, 'days') + 1;
        let thisDay = start.local().format('MM/DD/YYYY');
        let range = [...pdArr];
        for (let i = 0; i < range; i++) {
            console.log("     range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'))
        }
        //range.push(start)
        for (let i = 1; i !== diff + 1; i++) {
            let duplicate = false;
            let tmpDay = moment(thisDay).local();

            for (let k = 0; k < range.length; k++) {
                let rangeStart = range[k].startOf('day');
                let tmpStart = tmpDay.startOf('day');

                if (rangeStart.isSame(tmpStart)) {
                    duplicate = true;
                }
            }

            if (!duplicate) {
                range.push(tmpDay);
            }
            let tmpTmpDay = moment(tmpDay.format("MM/DD/YYYY hh:mm:ss"))
            thisDay = tmpTmpDay.add(1, 'day').format('MM/DD/YYYY hh:mm:ss')
        }
        for (let i = 0; i < range.length; i++) {
            console.log("range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'));
        }
        return range;
    }

    useEffect (() => {
        if (!companyId) {
            let cid = window.localStorage.getItem("companyId");
            if (cid) {
             dispatch(setCompanyId(cid));
            }
        }
        if (!companyLocations) {
            ( async() => {
                const locations = await getCompanyInfo(companyId)
                if (!locations.errors) {
                    dispatch(setCompanyLocations(locations));
                } else {
                    console.log("CompanyView: Error in get Company Locations")
                }
            })()
        }
        if (!placements) {
            (async() => {
                console.log("Getting placements for this company")
                const p = await getCompanyPlacementTableInfo(companyId);
                if (!p.errors) {
                    console.log("CompanyView: Placements set as:  ", p)
                    console.log("CompanyView: Setting placement info in redux store...")
                    dispatch(setPlacementInfo(p))
                } else {
                    console.log("CompanyView: Error in getCompanyPlacementTableInfo fetch call")
                }
                const pd = await getCompanyPlacementCalendarInfo(companyId);
                if (!pd.errors) {
                    console.log("CompanyView: Placement Dates set as: ", pd)
                    console.log("CompanyView: Setting placementDates in redux store...")
                    dispatch(setPlacementDates(pd));
                } else {
                    console.log("CompanyView: Error with getCompanyPlacementCalendar fetch call");
                }
            })()
        }
        console.log("Company placements: ", placements);
        console.log("Company dates: ", placementDates);
    },[companyId] );

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
                <Calendar key={"newCalendar"} placements={placements} placementDates={placementDates} datesBlocked={[]} userType={'company'}></Calendar>
                {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
                {/* <Button key={"buttonKey"} onClick={savePlacement} style={{backgroundColor: "#616161", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button> */}
                <CompanyPlacementTable key={"coPlacement"} ></CompanyPlacementTable>
            </>
        );
    }
}

export default CompanyView;
