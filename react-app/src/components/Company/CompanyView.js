import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import Calendar from '../CalendarComponent/Calendar';
import { setCompanyId, setCompanyLocations, getCompanyInfo } from '../../store/company';
import { setUserType } from '../../store/authentication'
import { setContractorId } from '../../store/contractor';
import { setAgencyId } from '../../store/agencyInfo';

const CompanyView = () => {
    console.log("Company View:  Loading component...")
    const dispatch = useDispatch();
    let companyId = useSelector(state => state.company.companyId);
    const placements = useSelector(state => state.placement.placementInfo);
    const placementDates = useSelector(state => state.placement.placementDates);
    const companyLocations = useSelector(state => state.company.companyLocations);
    let userType = useSelector(store => store.authentication.userType);
    let contractorId = useSelector(store => store.contractor.contractorId);
    let agencyId = useSelector(store => store.agencyInfo.agencyId);

    const setInitialAuth = () => {
        if (!userType) {
          userType = window.localStorage.getItem("userType")
          dispatch(setUserType(userType));
         }
        if (!companyId && userType === 'company') {
          companyId = window.localStorage.getItem("companyId");
          dispatch(setCompanyId(companyId));
         }
        if (!contractorId && userType === 'contractor') {
          contractorId = window.localStorage.getItem("contractorId");
          dispatch(setContractorId(contractorId));
         }
         if (!agencyId && userType === 'agency') {
           agencyId = window.localStorage.getItem("agencyId");
           dispatch(setAgencyId(agencyId));
         }
      }
    // function printRange(message, range) {
    //     console.log(message);
    //     for (let i = 0; i < range.length; i++) {
    //         console.log("     range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'));
    //     }
    // }

    // function getDateRange(startDate, endDate, pdArr) {

    //     let start = moment(startDate);
    //     let end = moment(endDate);

    //     let diff = end.diff(start, 'days') + 1;
    //     let thisDay = start.local().format('MM/DD/YYYY');
    //     let range = [...pdArr];
    //     for (let i = 0; i < range; i++) {
    //         console.log("     range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'))
    //     }
    //     //range.push(start)
    //     for (let i = 1; i !== diff + 1; i++) {
    //         let duplicate = false;
    //         let tmpDay = moment(thisDay).local();

    //         for (let k = 0; k < range.length; k++) {
    //             let rangeStart = range[k].startOf('day');
    //             let tmpStart = tmpDay.startOf('day');

    //             if (rangeStart.isSame(tmpStart)) {
    //                 duplicate = true;
    //             }
    //         }

    //         if (!duplicate) {
    //             range.push(tmpDay);
    //         }
    //         let tmpTmpDay = moment(tmpDay.format("MM/DD/YYYY hh:mm:ss"))
    //         thisDay = tmpTmpDay.add(1, 'day').format('MM/DD/YYYY hh:mm:ss')
    //     }
    //     for (let i = 0; i < range.length; i++) {
    //         console.log("range[", i, "]: ", range[i].format('MM/DD/YYYY hh:mm:ss'));
    //     }
    //     return range;
    // }

    useEffect (() => {
        if (!userType) { setInitialAuth() }
        console.log("CompanyView:  useEffect: Checking companyId and companyLocations")
        if (!companyId) {
            console.log("CompanyView: useEffect: setting companyId in Redux store");
            let cid = window.localStorage.getItem("companyId");
            if (cid) {
             dispatch(setCompanyId(cid));
            }
        }
        if (!companyLocations) {
            ( async() => {

                const locations = await getCompanyInfo(companyId)
                console.log("CompanyView: useEffect: setting Company Locations in Redux store");
                if (!locations.errors) {
                    dispatch(setCompanyLocations(locations));
                } else {
                    console.log("CompanyView: Error in get Company Locations")
                }
            })()
        }
        // if (!placements) {
        //     (async() => {
        //         console.log("Getting placements for this company")
        //         const p = await getCompanyPlacementTableInfo(companyId);
        //         if (!p.errors) {
        //             console.log("CompanyView: Placements set as:  ", p)
        //             console.log("CompanyView: Setting placement info in redux store...")
        //             dispatch(setPlacementInfo(p))
        //         } else {
        //             console.log("CompanyView: Error in getCompanyPlacementTableInfo fetch call")
        //         }
        //         const pd = await getCompanyPlacementCalendarInfo(companyId);
        //         if (!pd.errors) {
        //             console.log("CompanyView: Placement Dates set as: ", pd)
        //             console.log("CompanyView: Setting placementDates in redux store...")
        //             dispatch(setPlacementDates(pd));
        //         } else {
        //             console.log("CompanyView: Error with getCompanyPlacementCalendar fetch call");
        //         }
        //     })()
        // }
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
                <Calendar></Calendar>
                {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
                {/* <Button key={"buttonKey"} onClick={savePlacement} style={{backgroundColor: "#616161", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button> */}
                {/* <CompanyPlacementTable key={"coPlacement"} ></CompanyPlacementTable> */}
            </>
        );
    }
}

export default CompanyView;
