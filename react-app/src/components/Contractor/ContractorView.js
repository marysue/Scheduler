import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { getAllBlocked, setBlocked} from '../../store/blocked';
import { Button } from '@material-ui/core';
import { getContractorPlacements, getContractorPlacementCalendar, getContractorPlacementTableInfo, setPlacementInfo, setPlacementDates } from '../../store/placement';
import  ContractorPlacementTable  from './ContractorPlacementTable';
import Calendar from '../CalendarComponent/Calendar';
import { setContractorId } from '../../store/contractor';

const ContractorView = () => {
    console.log("Entered ContractorView")
    const dispatch = useDispatch();
    const [datesBlocked, setDatesBlocked] = useState([]);
    const contractorId = useSelector(state => state.contractor.contractorId);
    // const [placements, setPlacements] = useState([]);
    // const [placementDates, setPlacementDates] = useState();
    const placements = useSelector(state => state.placement.placementInfo);
    const placementDates = useSelector(state => state.placement.placementDates);

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
        if (!contractorId) {
            console.log("ContractorView: No contractor Id - getting it from local storage")
            let cid = window.localStorage.getItem("contractorId");
            if (cid) {
             dispatch(setContractorId(cid));
            }
        }
        if (!placements) {
        (async() => {
            const blockedDates = await getAllBlocked(contractorId);
            if (!blockedDates.errors) {
                let bd = blockedDates["blockedDates"]
                const blockedArr = []
                for (let i = 0; i < bd.length; i++) {
                    // console.log("Received date blocked: ", bd[i].blocked)
                    const date = bd[i].blocked.replace(" GMT", "")
                    // console.log("date: ", date);
                    // console.log("Tranforming into moment: ", moment(date).format('MM/DD/YYYY HH:mm:ss'));
                    // console.log("Transforming into local : ", moment(bd[i].blocked).local());
                    blockedArr.push(moment(date).local());
                }
                console.log("Blocked array in ContractorView: ")
                for (let i = 0; i < blockedArr.length; i++) {
                    console.log("     ", blockedArr[i].format('MM/DD/YYYY HH:mm:ss'));

                }
                setDatesBlocked(blockedArr);
                dispatch(setBlocked(blockedArr));
            } else {
                console.log("ContractorView:  Error from getAllBlocked fetch call");
            }
            console.log("Getting placements for this contractor")
            // const p = await getContractorPlacements(contractorId);
            const p = await getContractorPlacementTableInfo(contractorId);
            if (!p.errors) {
                console.log("ContractorView: Placements set as:  ", p)
                //setPlacements(p)
                console.log("ContractorView: Setting placement info in redux store...")
                dispatch(setPlacementInfo(p))
            } else {
                console.log("ContractorView: Error in getContractorPlacementTableInfo fetch call")
            }
            const pd = await getContractorPlacementCalendar(contractorId);
            if (!pd.errors) {
                console.log("ContractorView: Placement Dates set as: ", pd)
                //setPlacementDates(pd)
                console.log("ContractorView: Setting placementDates in redux store...")
                dispatch(setPlacementDates(pd));
            } else {
                console.log("ContractorView: Error with getContractorPlacementCalendar fetch call");
            }
        })();

    }

    }, [contractorId, placements] )

    const saveDates = async () => {
        // const blocked = createBlocked(contractorId, datesBlocked)
        dispatch(setBlocked(datesBlocked));

    }

    if (!contractorId) {
        console.log('Contractor Id is not set on login');
        return null
    } else {
        return (
            <>
                <Calendar key={"contrCalendar"} datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked} userType={"contractor"}></Calendar>
                {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
                <Button onClick={saveDates} style={{backgroundColor: "#616161", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button>
                <ContractorPlacementTable></ContractorPlacementTable>
            </>
        );
    }
}

export default ContractorView;
