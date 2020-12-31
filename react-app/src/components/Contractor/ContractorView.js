import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import { getAllBlocked, setBlocked} from '../../store/blocked';
import { Button } from '@material-ui/core';
import { getContractorPlacements, getContractorPlacementCalendar, getContractorPlacementTableInfo, setPlacementInfo, setPlacementDates } from '../../store/placement';
import  ContractorPlacementTable  from './ContractorPlacementTable';
import Calendar from '../CalendarComponent/Calendar';
import { setContractorId } from '../../store/contractor';
import { createBlocked } from '../../store/blocked';

const ContractorView = () => {
    console.log("Entered ContractorView")
    const dispatch = useDispatch();
    const [datesBlocked, setDatesBlocked] = useState([]);
    const contractorId = useSelector(state => state.contractor.contractorId);
    // const [placements, setPlacements] = useState([]);
    // const [placementDates, setPlacementDates] = useState();
    const placements = useSelector(state => state.placement.placementInfo);
    const placementDates = useSelector(state => state.placement.placementDates);
    const dbSlice = useSelector(state => state.blocked);
    let db = [];

    if (dbSlice) {
        db = dbSlice.blocked;
    }




    useEffect (() => {
        if (datesBlocked.length === 0) {
            setDatesBlocked(db)
        };

        if (!contractorId) {
            console.log("We have a contractor id, but it is not set in the redux store... handling now.")
            console.log("ContractorView: No contractor Id - getting it from local storage")
            let cid = window.localStorage.getItem("contractorId");
            if (cid) {
             dispatch(setContractorId(cid));
            }
        }

        if (!placements) {
            console.log("We have no placements.");
        (async() => {
            const blockedDates = await getAllBlocked(contractorId);
            if (!blockedDates.errors) {
                let bd = blockedDates["blockedDates"]
                const blockedArr = []
                for (let i = 0; i < bd.length; i++) {
                    const date = bd[i].blocked.replace(" GMT", "")
                    blockedArr.push(moment(date).local());
                }
                setDatesBlocked(blockedArr);
                dispatch(setBlocked(blockedArr));
            } else {
                console.log("ContractorView:  Error from getAllBlocked fetch call");
            }
            console.log("Getting placements for this contractor")

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
        console.log("Saving dates blocked to backend database")
        const blocked = createBlocked(contractorId, datesBlocked)
        if (!blocked.errors) {
            console.log("saving blocked dates to redux store")
            dispatch(setBlocked(datesBlocked));
        } else {
            console.log("Error setting dates blocked to backend.")
        }


    }

    if (!contractorId) {
        console.log('Contractor Id is not set on login');
        return null
    } else {
        return (
            <>
                <Calendar key={"contrCalendar"} datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked} userType={"contractor"}></Calendar>
                {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
                <Button onClick={saveDates} style={{backgroundColor: "#648dae", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button>
                {/* <ContractorPlacementTable></ContractorPlacementTable> */}
            </>
        );
    }
}

export default ContractorView;
