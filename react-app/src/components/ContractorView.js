import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import Calendar from './CalendarComponent/Calendar'
import DatesBlocked from './DatesBlocked'
import { getAllBlocked, setBlocked } from '../store/blocked';

const ContractorView = () => {
    console.log("Entered ContractorView")
    const dispatch = useDispatch();
    const [datesBlocked, setDatesBlocked] = useState([]);
    const contractorId = useSelector(state => state.contractor.contractorId);

    useEffect (() => {
        (async() => {
            console.log("calling getAllBlocked with cid: ", contractorId);
            const blockedDates = await getAllBlocked(contractorId);
            console.log("Received blockedDates: ", blockedDates);
            if (!blockedDates.errors) {
                let bd = blockedDates["blockedDates"]
                const blockedArr = []
                for (let i = 0; i < bd.length; i++) {
                    blockedArr.push(bd[i].blocked)
                }
                setDatesBlocked(blockedArr);
                dispatch(setBlocked(blockedArr));
                console.log("Received Dates blocked array: ", datesBlocked)
            } else {
                console.log("ContractorView:  Error from getAllBlocked fetch call");
            }
        })();
    }, [] )

    if (!contractorId) {
        console.log('Contractor Id is not set on login');
        return null
    } else {
        return (
            <>
            <Calendar datesBlocked={datesBlocked} setDatesBlocked={setDatesBlocked}></Calendar>
            <div>
                <DatesBlocked datesBlocked={datesBlocked} ></DatesBlocked>
            </div>
            </>
        );
    }
}

export default ContractorView;
