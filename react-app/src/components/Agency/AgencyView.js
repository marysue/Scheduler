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
                    dispatch(setAgencyCompanyPlacementInfo(p))
                } else {
                    console.log("AgencyView: Error in getAll AgencyCompanyPlacementTableInfo fetch call")
                }
                const pd = await getAllAgencyCompanyPlacementCalendarInfo();
                if (!pd.errors) {
                    dispatch(setAgencyCompanyPlacementDates(pd));
                } else {
                    console.log("AgencyView: Error with getCompanyPlacementCalendar fetch call");
                }
            })()

    }, []) ;


    return (
        <>
            <Calendar placements={companyPlacementInfo} placementDates={companyPlacementDates} datesBlocked={[]} userType={'agency'}></Calendar>
        </>
    );

}

export default AgencyView;
