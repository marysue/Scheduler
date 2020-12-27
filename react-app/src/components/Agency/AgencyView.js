import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import moment from "moment";
import { Button } from '@material-ui/core';
import  AgencyPlacementTable  from './AgencyPlacementTable';
import Calendar from '../CalendarComponent/Calendar';
import CompanyPlacementTable from '../Company/CompanyPlacementTable';
import { getAllAgencyContractorPlacementCalendarInfo, getAllAgencyContractorPlacementTableInfo, setAgencyContractorPlacementDates, setAgencyContractorPlacementInfo} from '../../store/agencyCompanyPlacements';
import { getAllAgencyCompanyPlacementCalendarInfo, getAllAgencyCompanyPlacementTableInfo, setAgencyCompanyPlacementDates, setAgencyCompanyPlacementInfo } from "../../store/agencyCompanyPlacements";
import {  getAllContractorInfo, getAllCompanyInfo, setAgencyCompanyInfo, setAgencyContractorInfo } from "../../store/agencyInfo";
const AgencyView = () => {
    console.log("Entered AgencyView")
    const dispatch = useDispatch();
    const companyPlacementDates = useSelector( state => state.agencyCompanyPlacements.placementDates )
    const companyPlacementInfo = useSelector ( state => state.agencyCompanyPlacements.placementInfo )
    const contractorPlacementDates = useSelector ( state => state.agencyContractorPlacements.placementDates )
    const contractorPlacementInfo = useSelector ( state => state.agencyContractorPlacements.placementInfo)
    const companyInfo = useSelector (state => state.agencyInfo.companyInfo)
    const contractorInfo = useSelector (state => state.agencyInfo.contractorInfo)

    console.log(" *********************Entered Agency View********************")

    useEffect (() => {

            (async() => {
                console.log("Getting placements for agency")
                const p = await getAllAgencyCompanyPlacementTableInfo();
                if (!p.errors) {
                    console.log("AgencyView: Placement Table Info set as:  ", p)
                    console.log("AgencyView: Setting placement table info in redux store...")
                    dispatch(setAgencyCompanyPlacementInfo(p))
                } else {
                    console.log("AgencyView: Error in getAll AgencyCompanyPlacementTableInfo fetch call")
                }
                const pd = await getAllAgencyCompanyPlacementCalendarInfo();
                if (!pd.errors) {
                    console.log("AgencyView: Placement Calendar Dates set as: ", pd)
                    console.log("AgencyView: Setting placementDates in redux store...")
                    dispatch(setAgencyCompanyPlacementDates(pd));
                } else {
                    console.log("AgencyView: Error with getCompanyPlacementCalendar fetch call");
                }
            })()

    }, []) ;

    const savePlacement= async () => {
        console.log("save Placement to backend - needs to be implemented")
    }

    return (
        <>
            <div><h2 style={{textAlign: "center"}}>Agency View</h2></div>
            <Calendar key={"newCalendar"} placements={companyPlacementInfo} placementDates={companyPlacementDates} datesBlocked={[]} userType={'agency'}></Calendar>
            {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
            {/* <Button key={"buttonKey"} onClick={savePlacement} style={{backgroundColor: "#616161", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button> */}
            {/* <AgencyPlacementTable key={"coPlacement"} ></AgencyPlacementTable> */}
        </>
    );

}

export default AgencyView;
