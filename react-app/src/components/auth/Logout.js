import React from "react";

import { logout } from '../../store/authentication';
import { useDispatch } from 'react-redux';
import { removeUserId, removeUserName, removeUserEmail, removeToken, removeUserType } from '../../store/authentication';
import { removeCompanyLocations, removeCompanyId, removeCompanyName, removeCompanyContactName, removeCompanyPhone, removeCompanyEmail, removeCompanyAddr1, removeCompanyAddr2, removeCompanyCity, removeCompanyState, removeCompanyZip } from '../../store/company'
import { removeAvailableContractors, removeContractorId, removeStaffType, removeContractorName, removeContractorPhone, removeContractorEmail, removeContractorAddr1, removeContractorAddr2, removeContractorCity, removeContractorState, removeContractorZip } from '../../store/contractor'
import { removePlacementInfo, removePlacementDates } from '../../store/placement'

const Logout = async () => {
    console.log("Called Logout...")
    const dispatch = useDispatch();
    const retVal = await logout();
    if (!retVal.errors) {
        //setAuthenticated(false);

        dispatch(removeUserId());
        dispatch(removeUserName());
        dispatch(removeUserEmail());
        dispatch(removeToken());
        dispatch(removeUserType());

        dispatch(removeCompanyId());
        dispatch(removeCompanyName());
        dispatch(removeCompanyContactName());
        dispatch(removeCompanyPhone());
        dispatch(removeCompanyEmail());
        dispatch(removeCompanyAddr1());
        dispatch(removeCompanyAddr2());
        dispatch(removeCompanyCity());
        dispatch(removeCompanyState());
        dispatch(removeCompanyZip());
        dispatch(removeCompanyLocations());

        dispatch(removeContractorId());
        dispatch(removeStaffType());
        dispatch(removeContractorName());
        dispatch(removeContractorPhone());
        dispatch(removeContractorEmail());
        dispatch(removeContractorAddr1());
        dispatch(removeContractorAddr2());
        dispatch(removeContractorCity());
        dispatch(removeContractorState());
        dispatch(removeContractorZip());
        dispatch(removeAvailableContractors());

        dispatch(removePlacementDates());
        dispatch(removePlacementInfo());

        window.sessionStorage.removeItem("userId")
        window.sessionStorage.removeItem("contractorId")
        window.sessionStorage.removeItem("companyId")
        window.sessionStorage.removeItem("agencyId");
        window.sessionStorage.removeItem("userType");
    }

};

export default Logout;
