import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AgencyContractorPlacementTable from './AgencyContractorPlacementTable';
import { setAgencyCompanyPlacementDates, setAgencyCompanyPlacementInfo, getAllAgencyCompanyPlacementCalendarInfo, getAllAgencyCompanyPlacementTableInfo } from '../store/agencyCompanyPlacements';


const AgencyContractorPlacements = () => {
    console.log("********************AGENCY CONTRACTOR PLACEMENTS****************************")
    const dispatch = useDispatch();
    const placements = useSelector ( store => store.agencyCompanyPlacements )
    const placementDates = useSelector ( store => store.agencyCompanyPlacements.placementDates )

    useEffect (() => {
            (async() => {
                const p = await getAllAgencyCompanyPlacementTableInfo();
                if (!p.errors) {
                    console.log("CompanyView: Placement table info set as:  ", p.placements)
                    console.log("CompanyView: Setting placement info in redux store...")
                    dispatch(setAgencyCompanyPlacementInfo(p.agencyInfo))
                } else {
                    console.log("CompanyView: Error in getCompanyPlacementTableInfo fetch call")
                }
                const pd = await getAllAgencyCompanyPlacementCalendarInfo();
                if (!pd.errors) {
                    console.log("CompanyView: Placement Dates set as: ", pd)
                    console.log("CompanyView: Setting placementDates in redux store...")
                    dispatch(setAgencyCompanyPlacementDates(pd));
                } else {
                    console.log("CompanyView: Error with getCompanyPlacementCalendar fetch call");
                }
            })()
        console.log("Company placements: ", placements);

        console.log("Company dates: ", placementDates);
    },[] );

return (
    // <div>Agency Placement Table</div>
    <AgencyContractorPlacementTable placements={placements.placementInfo} placementDates={placementDates}></AgencyContractorPlacementTable>
)
}

export default AgencyContractorPlacements;
