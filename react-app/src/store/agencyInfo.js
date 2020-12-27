//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_COMPANY_INFO = '/user/placement/SET_COMPANY_INFO';
export const REMOVE_COMPANY_INFO = '/user/placement/REMOVE_COMPANY_INFO';
export const SET_CONTRACTOR_INFO = '/user/placement/SET_CONTRACTOR_INFO';
export const REMOVE_CONTRACTOR_INFO = '/user/placement/REMOVE_CONTRACTOR_INFO';

export const setAgencyCompanyInfo = companyInfo => ({ type: SET_COMPANY_INFO, companyInfo})
export const removeAgencyCompanyInfo = () => ({ type: REMOVE_COMPANY_INFO})
export const setAgencyContractorInfo = contractorInfo => ({ type: SET_CONTRACTOR_INFO, contractorInfo})
export const removeAgencyContractorInfo = () => ({ type: REMOVE_CONTRACTOR_INFO})

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_CONTRACTOR_INFO: {
            const newState = { ...state}
            newState.contractorInfo = action.contractorInfo;
            console.log("Set placement info: ", newState.contractorInfo)

            return newState
        }
        case REMOVE_CONTRACTOR_INFO: {
            const newState = { ...state}
            delete newState.contractorInfo
            return newState;
        }
        case SET_COMPANY_INFO: {
            const newState = { ...state}
            newState.companyInfo = action.companyInfo;
            console.log("Set placement info: ", newState.companyInfo)

            return newState
        }
        case REMOVE_COMPANY_INFO: {
            const newState = { ...state}
            delete newState.companyInfo
            return newState;
        }
        default:
            return state;
    }
}

//  ****************** AGENCY ********************
// *********************COMPANY PLACEMENTS**************
export const getAllCompanyInfo = async () => {
    const response = await fetch(`/api/company/all`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getAllContractorInfo = async () => {
    const response = await fetch(`/api/contractor/all`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}
