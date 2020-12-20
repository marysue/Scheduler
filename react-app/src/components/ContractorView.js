import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
// import { Redirect } from 'react-router-dom';
import Calendar from './CalendarComponent/Calendar'
//import DatesBlocked from './DatesBlocked'
import { getAllBlocked, setBlocked, createBlocked } from '../store/blocked';
import { Button } from '@material-ui/core';
import { getContractorPlacements } from '../store/placement';
import  ContractorPlacementTable  from './ContractorPlacementTable';
import DayCard from './CalendarComponent/DayCard';
import NewCalendar from './CalendarComponent/NewCalendar';

const ContractorView = () => {
    console.log("Entered ContractorView")
    const dispatch = useDispatch();
    const [datesBlocked, setDatesBlocked] = useState([]);
    const contractorId = useSelector(state => state.contractor.contractorId);
    const [placements, setPlacements] = useState([]);
    const [placementDates, setPlacementDates] = useState([]);

    function getDateRange(startDate, endDate) {
        let start = moment(startDate);
        let end = moment(endDate);
        let diff = end.diff(start, 'days') + 1;
        let thisDay = start.format('MM/DD/YYYY');
        let range = [];

        for (let i = 1; i !== diff + 1; i++) {
            let tmpDay = moment(thisDay);
            range.push(tmpDay);
            thisDay = tmpDay.add(1, 'day').format('MM/DD/YYYY')
        }
        for (let i = 0; i < range.length; i++) {
            console.log("range[", i, "]: ", range[i].format('MM/DD/YYYY'));
        }
        return range;
    }

    useEffect (() => {
        (async() => {
            const blockedDates = await getAllBlocked(contractorId);
            if (!blockedDates.errors) {
                let bd = blockedDates["blockedDates"]
                const blockedArr = []
                for (let i = 0; i < bd.length; i++) {
                    blockedArr.push(moment(bd[i].blocked));
                }
                setDatesBlocked(blockedArr);
                dispatch(setBlocked(blockedArr));
            } else {
                console.log("ContractorView:  Error from getAllBlocked fetch call");
            }
            console.log("Getting placements for this contractor")
            const p = await getContractorPlacements(contractorId);
            if (!p.errors) {
                const pa = p["placements"];
                const pd = []
                const placementObj = [];
                for (let j = 0; j < pa.length; j++) {
                    console.log("Company Id:  ", pa[j].companyContact.id);
                    console.log("CompanyName: ", pa[j].companyContact.companyName);
                    placementObj.push({ "companyId": pa[j].companyContact.id,
                                         "companyName": pa[j].companyContact.companyName,
                                         "contactName": pa[j].companyContact.name,
                                         "contactEmail": pa[j].companyContact.email,
                                         "contactPhone": pa[j].companyContact.phone,
                                         "addr1": pa[j].companyContact.addr1,
                                         "addr2": pa[j].companyContact.addr2,
                                         "city": pa[j].companyContact.city,
                                         "state": pa[j].companyContact.state,
                                         "zip": pa[j].companyContact.zip,
                                         "startDate": pa[j].startDate,
                                         "endDate": pa[j].endDate,
                                         "staffType": pa[j].contractor.staffType })
                    console.log("Placement[",j, "]:  start: ", pa[j].startDate, " end: ", pa[j].endDate)
                    if (pa[j].startDate === pa[j].endDate) {
                        let temp =  moment(pa[j].startDate);
                        pd.push(temp);
                    } else {
                        let dr = getDateRange(pa[j].startDate, pa[j].endDate)
                        for (let i = 0; i < dr.length; i++) {
                            pd.push(dr[i]);
                        }
                    }
                }
                setPlacements(placementObj);
                setPlacementDates(pd);
                console.log("Placement dates set:  ", placementDates);
            } else {
                console.log("Errors getting placements:  ", p.errors);
            }
        })();
    }, [] )
    const saveDates = async () => {
        const blocked = createBlocked(contractorId, datesBlocked)
        dispatch(setBlocked(datesBlocked));

    }

    if (!contractorId) {
        console.log('Contractor Id is not set on login');
        return null
    } else {
        return (
            <>
            <DayCard></DayCard>
            <NewCalendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></NewCalendar>
            {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
            <Button onClick={saveDates} style={{backgroundColor: "blue", color: "white", border: "1 px solid blue"}}>SAVE</Button>
            <ContractorPlacementTable placements={placements}></ContractorPlacementTable>
            </>
        );
    }
}

export default ContractorView;
