import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AgencyCompanyPlacementTable from './AgencyCompanyPlacementTable';
import { setAgencyCompanyPlacementDates, setAgencyCompanyPlacementInfo, getAllAgencyCompanyPlacementCalendarInfo, getAllAgencyCompanyPlacementTableInfo } from '../store/agencyCompanyPlacements';


const AgencyCompanyPlacements = () => {
    console.log("********************AGENCY COMPANY PLACEMENTS****************************")
    const dispatch = useDispatch();
    const placements = useSelector ( store => store.agencyCompanyPlacements )
    const placementDates = useSelector ( store => store.agencyCompanyPlacements.placementDates )

    useEffect (() => {
            (async() => {
                const p = await getAllAgencyCompanyPlacementTableInfo();
                if (!p.errors) {
                    dispatch(setAgencyCompanyPlacementInfo(p.agencyInfo))
                } else {
                }
                const pd = await getAllAgencyCompanyPlacementCalendarInfo();
                if (!pd.errors) {
                    dispatch(setAgencyCompanyPlacementDates(pd));
                } else {

                }
            })()
        console.log("Company placements: ", placements);

        console.log("Company dates: ", placementDates);
    },[] );

return (
    // <div>Agency Placement Table</div>
    <AgencyCompanyPlacementTable placements={placements.placementInfo} placementDates={placementDates}></AgencyCompanyPlacementTable>
)
}

export default AgencyCompanyPlacements;
