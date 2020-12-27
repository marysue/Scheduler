import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCompanyInfo, setAgencyCompanyInfo } from '../store/agencyInfo';
import AgencyCompanyTable from './AgencyCompanyTable';

const AgencyCompanies = () => {
    const dispatch = useDispatch();

    const companies = useSelector( state => state.agencyInfo.companyInfo.companies )

    useEffect (() => {

        (async() => {
            const p = await getAllCompanyInfo();
            if (!p.errors) {
                dispatch(setAgencyCompanyInfo(p))
            } else {
                console.log("AgencyView: Error in getAll AgencyCompanyPlacementTableInfo fetch call")
            }
        })()

}, []) ;
    return (
        <AgencyCompanyTable></AgencyCompanyTable>
    )
}

export default AgencyCompanies;
