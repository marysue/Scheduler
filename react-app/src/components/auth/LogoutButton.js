import React from "react";
import { Redirect } from 'react-router-dom';
//import { logout } from "../../services/auth";
import { logout } from '../../store/authentication';
import { useDispatch } from 'react-redux';
import { removeUserId, removeUserName, removeUserEmail, removeToken, removeUserType } from '../../store/authentication';
import { removeCompanyId, removeCompanyName, removeCompanyContactName, removeCompanyPhone, removeCompanyEmail, removeCompanyAddr1, removeCompanyAddr2, removeCompanyCity, removeCompanyState, removeCompanyZip } from '../../store/company'
import { removeContractorId, removeStaffType, removeContractorName, removeContractorPhone, removeContractorEmail, removeContractorAddr1, removeContractorAddr2, removeContractorCity, removeContractorState, removeContractorZip } from '../../store/contractor'

const LogoutButton = ({setAuthenticated}) => {
  console.log("Entered LogoutButton")
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    console.log("onLogout...")
    const retVal = await logout();
    if (!retVal.errors) {

    setAuthenticated(false);

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

    window.localStorage.removeItem("currentUser")
    window.localStorage.removeItem("userId")
    window.localStorage.removeItem("contractorId")
    window.localStorage.removeItem("companyId")
    window.localStorage.removeItem("agencyId");

    return <Redirect to='/'></Redirect>
    } else {
      console.log("LogoutButton:  Errors logging out: ", retVal.errors);
    }
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
