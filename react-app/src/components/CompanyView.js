import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { Button } from '@material-ui/core';
import { getCompanyPlacements } from '../store/placement';
import  CompanyPlacementTable  from './CompanyPlacementTable';
import NewCalendar from './CalendarComponent/Calendar';
import { setCompanyId } from '../store/company';

const CompanyView = () => {
    console.log("Entered CompanyView")
    const dispatch = useDispatch();
    const companyId = useSelector(state => state.company.companyId);
    const [placements, setPlacements] = useState([]);
    const [placementDates, setPlacementDates] = useState([]);
    console.log(" *********Entered Company View**************")
    console.log("placementDates array length: ", placementDates.length);

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
        (async() => {
            const placements = await getCompanyPlacements(companyId);
            console.log("************ Placement dates array length: ", placementDates.length)
            if (!placements.errors) {
                let pl = placements["placements"]
                const placementArr = []
                let placementDatesArr = []
                for (let i = 0; i < pl.length; i++) {
                    // console.log("Received date blocked: ", pl[i].blocked)
                    const startDate = moment(pl[i].startDate.replace(" GMT", "")).format('MM/DD/YYYY HH:mm:ss')
                    const endDate = moment(pl[i].endDate.replace(" GMT", "")).format('MM/DD/YYYY HH:mm:ss')
                    const name = pl[i].contractor.contractorContact.name;
                    const email = pl[i].contractor.contractorContact.email;
                    const phone = pl[i].contractor.contractorContact.phone;
                    const city = pl[i].contractor.contractorContact.city;
                    const staffType = pl[i].contractor.staffType;
                    const contractorId = pl[i].contractor.id
                    // console.log("date: ", date);
                    // console.log("Tranforming into moment: ", moment(date).format('MM/DD/YYYY HH:mm:ss'));
                    // console.log("Transforming into local : ", moment(pl[i].blocked).local());
                    placementArr.push({startDate, endDate, name, email, phone, city, staffType, contractorId});

                    const pd = getDateRange(startDate, endDate, placementDatesArr);
                    console.log("Received from getDateRange: ")
                    // for (let k=0; k < pd.length || k == 5; k++) {
                    //     console.log("     dateRange[", k, "]: ", pd[k].format('MM/DD/YYYY hh:mm:ss'))
                    // }
                    console.log("Before setting PlacementDates in useEffect: ")
                    for (let k=0; k < placementDatesArr.length; k++) {
                        console.log("     placementDates[", k, "]: ", placementDatesArr[k].format('MM/DD/YYYY hh:mm:ss'))
                    }
                    placementDatesArr = ([...pd])
                    console.log("After updating PlacementDates: ")
                    for (let k=0; k < placementDatesArr.length || k === 5; k++) {
                        console.log("      placementDatesArr[", k, "]: ", placementDatesArr[k].format('MM/DD/YYYY hh:mm:ss'))
                    }
                    console.log("Placement date for [", i, "]: ", pd)
                    // setPlacementDates(...placementDates, ...pd)
                }
                console.log("Placement array in CompanyView: ")
                for (let i = 0; i < placementArr.length || i === 5; i++) {
                    console.log("placementArr[", i, "]:  ", placementArr[i])
                }
                setPlacements(placementArr);
                setPlacementDates([...placementDatesArr])
                console.log("Placement dates: ", placementDatesArr);
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
