import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import moment from "moment";
import { Button } from '@material-ui/core';
import  AgencyPlacementTable  from './AgencyPlacementTable';
import NewCalendar from './CalendarComponent/Calendar';
import CompanyPlacementTable from './CompanyPlacementTable';
import { getAllAgencyTableInfo, getAllAgencyCalendarInfo, setPlacementInfo, setPlacementDates } from '../store/placement';

const AgencyView = () => {
    console.log("Entered AgencyView")
    const dispatch = useDispatch();
    const placements = useSelector(state => state.placement.placementInfo);
    const placementDates = useSelector(state => state.placement.placementDates);

    console.log(" *********************Entered Agency View********************")

    useEffect (() => {


            (async() => {
                console.log("Getting placements for agency")
                const p = await getAllAgencyTableInfo();
                if (!p.errors) {
                    console.log("AgencyView: Placements set as:  ", p)
                    console.log("AgencyView: Setting placement info in redux store...")
                    dispatch(setPlacementInfo(p))
                } else {
                    console.log("AgencyView: Error in getCompanyPlacementTableInfo fetch call")
                }
                const pd = await getAllAgencyCalendarInfo();
                if (!pd.errors) {
                    console.log("AgencyView: Placement Dates set as: ", pd)
                    console.log("AgencyView: Setting placementDates in redux store...")
                    dispatch(setPlacementDates(pd));
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
            <NewCalendar key={"newCalendar"} placements={placements} placementDates={placementDates} datesBlocked={[]} userType={'company'}></NewCalendar>
            {/* <Calendar datesBlocked={datesBlocked} placements={placements} placementDates={placementDates} setDatesBlocked={setDatesBlocked}></Calendar> */}
            <Button key={"buttonKey"} onClick={savePlacement} style={{backgroundColor: "#616161", color: "white", marginTop:"5px", marginLeft:"80%"}}>SAVE</Button>
            <AgencyPlacementTable key={"coPlacement"} ></AgencyPlacementTable>
        </>
    );

}

export default AgencyView;
