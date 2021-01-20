import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Calendar from '../CalendarComponent/Calendar';
import { createBlocked } from '../../store/blocked';
import { setUserType } from '../../store/authentication';

const ContractorView = () => {
    console.log("*******ContractorView*******")
    const dispatch = useDispatch();
    const contractorSlice = useSelector(state => state.contractor);
    let userType = useSelector (state => state.authentication.userType);
    let contractorId = null;
    if (contractorSlice) { contractorId = contractorSlice.contractorId }
        const companySlice = useSelector(state => state.company)
        let companyId = null;
    if (companySlice) { companyId = companySlice.companyId }
    const blockedDates = useSelector(state => state.blocked.blocked);

    useEffect (() => {
        if (userType === undefined) {
            userType = window.localStorage.getItem("userType");
            dispatch(setUserType(userType));
        }
        if (userType === 'contractor' && contractorId === undefined) {
            contractorId = window.localStorage.getItem("contractorId")
        }

        // if (userType === 'contractor' && !contractorId) {
        //     console.log("We have a contractor id, but it is not set in the redux store... handling now.")
        //     console.log("ContractorView: No contractor Id - getting it from local storage")
        //     let cid = window.localStorage.getItem("contractorId");
        //     if (cid) {
        //      dispatch(setContractorId(cid));
        //     }
        // } else if (userType === 'company' && !companyId) {
        //     let cid = window.localStorage.getItem("companyId");
        //     if (cid) {
        //         dispatch(setCompanyId(cid));
        //     }
        // }
    }, [] )

    // const saveDates = async () => {
    //     console.log("ContractorView - saveDates: Saving dates blocked to backend database")
    //     const blocked = createBlocked(contractorId, blockedDates)
    //     if (!blocked.errors) {
    //         console.log("ContractorView - saveDates: saving blocked dates to redux store")
    //     } else {
    //         console.log("ContractorView - saveDates: Error setting dates blocked to backend.")
    //     }
    // }

        return (
            <>
                <Calendar></Calendar>
                {/* { userType === 'contractor' ?
                    <Button onClick={saveDates} style={{backgroundColor: "#648dae", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button> : null } */}
            </>
        );

}

export default ContractorView;
