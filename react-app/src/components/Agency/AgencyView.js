import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../CalendarComponent/Calendar';
import { getAllAgencyCompanyPlacementCalendarInfo, getAllAgencyCompanyPlacementTableInfo, setAgencyCompanyPlacementDates, setAgencyCompanyPlacementInfo } from "../../store/agencyCompanyPlacements";
const AgencyView = () => {
    console.log("Entered AgencyView")
    const dispatch = useDispatch();
    const companyPlacementDates = useSelector( state => state.agencyCompanyPlacements.placementDates )
    const companyPlacementInfo = useSelector ( state => state.agencyCompanyPlacements.placementInfo )

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
