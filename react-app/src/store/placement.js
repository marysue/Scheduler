//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_CONTRACTOR_ID = 'user/placement/SET_CONTRACTOR_ID';
export const REMOVE_CONTRACTOR_ID = 'user/placement/REMOVE_CONTRACTOR_ID';
export const SET_COMPANY_CONTACT_ID = '/user/placement/SET_COMPANY_CONTACT_ID';
export const REMOVE_COMPANY_CONTACT_ID = '/user/placement/REMOVE_COMPANY_CONTACT_ID';
export const SET_START_DATE = '/user/placement/SET_START_DATE';
export const REMOVE_START_DATE = '/user/placement/REMOVE_START_DATE';
export const SET_END_DATE = '/user/placement/SET_END_DATE';
export const REMOVE_END_DATE = '/user/placement/REMOVE_END_DATE';
export const SET_PLACEMENT_DATES = '/user/placement/SET_PLACEMENT_DATES';
export const REMOVE_PLACEMENT_DATES = '/user/placement/REMOVE_PLACEMENT_DATES';
export const SET_PLACEMENT_INFO = '/user/placement/SET_PLACEMENT_INFO';
export const REMOVE_PLACEMENT_INFO = '/user/placement/REMOVE_PLACEMENT_INFO';

export const setContractorId = id => ({ type: SET_CONTRACTOR_ID, id})
export const removeContractorId = () => ({ type: REMOVE_CONTRACTOR_ID})
export const setCompanyContactId = id => ({ type: SET_COMPANY_CONTACT_ID, id})
export const removeCompanyContactId = () => ({ type: REMOVE_COMPANY_CONTACT_ID})
export const setStartDate = startDate => ({ type: SET_START_DATE, startDate})
export const removeStartDate = () => ({ type: REMOVE_START_DATE})
export const setEndDate = endDate => ({ type: SET_END_DATE, endDate})
export const removeEndDate = () => ({ type: REMOVE_END_DATE})
export const setPlacementDates = placementDatesArray => ({ type: SET_PLACEMENT_DATES, placementDatesArray})
export const removePlacementDates = () => ({ type: REMOVE_PLACEMENT_DATES})
export const setPlacementInfo = placementInfoArray => ({ type: SET_PLACEMENT_INFO, placementInfoArray})
export const removePlacementInfo = () => ({ type: REMOVE_PLACEMENT_INFO})

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_CONTRACTOR_ID: {
            const newState = { ...state};
            newState.contractorId = action.id;
            console.log("Setting contractor id: ", newState.contractorId);
            return newState;
          }
        case REMOVE_CONTRACTOR_ID: {
            const newState = { ...state};
            console.log("Removing contractor id: ", newState.contractorId);
            delete newState.contractorId;
            return newState;
        }
        case SET_COMPANY_CONTACT_ID: {
            const newState = { ...state};
            newState.companyContactId = action.id;
            console.log("Setting contactId for placement: ", newState.companyContactId);
            return newState;
        }
        case REMOVE_COMPANY_CONTACT_ID: {
            const newState = { ...state};
            console.log("Removing company contact id: ", newState.companyContactId);
            delete newState.companyContactId;
            return newState;
        }
        case SET_START_DATE: {
            const newState = { ...state};
            newState.startDate = action.startDate;
            console.log("Setting start date for placement: ", newState.startDate);
            return newState;
        }
        case REMOVE_START_DATE: {
            const newState = { ...state};
            console.log("Removing start date for placement: ", newState.startDate);
            delete newState.startDate;
            return newState;
        }
        case SET_END_DATE: {
            const newState = { ...state};
            newState.endDate = action.endDate;
            console.log("Setting end date for placement: ", newState.endDate);
            return newState;
        }
        case SET_PLACEMENT_DATES: {
            const newState = { ...state}
            newState.placementDates = action.placementDatesArray;
            console.log("Setting placement dates array: ", newState.placementDates)
            return newState;
        }
        case REMOVE_PLACEMENT_DATES: {
            const newState = { ...state}
            delete newState.placementDates
            return newState;
        }
        case SET_PLACEMENT_INFO: {
            const newState = { ...state}
            newState.placementInfo = action.placementInfoArray;
            console.log("Set placement info: ", newState.placementInfo)

            return newState
        }
        case REMOVE_PLACEMENT_INFO: {
            const newState = { ...state}
            delete newState.placementInfo
            return newState;
        }
        default:
            return state;
    }
}

export const createPlacement = async (companyId, contractorId, companyContactId, startDate, endDate) => {
    //Not sure if I need to URI encode startDate, endDate - see contractor as I uri encoded a fetch call there
    // for an example.  If I do uri encode it, it needs to be uncoded on the backend as well
    console.log("Placement request:  ")
    console.log("     companyId: ", companyId)
    console.log("     contractorId: ", contractorId)
    console.log("     companyContactId: ", companyContactId)
    console.log("     startDate: ", startDate);
    console.log("     endDate: ", endDate);
    const response = await fetch(`/api/placement/${companyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          contractorId,
          companyContactId,
          startDate,
          endDate
        })
    });
    return await response.json();
  }
//  ****************** AGENCY ********************
export const getAllAgencyPlacements = async () => {
    const response = await fetch('/api/placement/agency/all', {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getAllAgencyCalendarInfo = async () => {
    const response = await fetch('/api/placement/agency/calendarInfo', {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getAllAgencyTableInfo = async () => {
    const response = await fetch('/api/placement/agency/tableInfo', {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

// **********************CONTRACTOR******************
//Not formatted - but currently used in ContractorView
//Need at some point to shift over to save logic in Contractor View
export const getContractorPlacements = async (contractorId) => {
    const response = await fetch(`/api/placement/contractor/${contractorId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getContractorPlacementCalendar = async (contractorId) => {
    const response = await fetch(`/api/placement/contractor/calendarInfo/${contractorId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getContractorPlacementTableInfo = async (contractorId) => {
    const response = await fetch(`/api/placement/contractor/tableInfo/${contractorId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getContractorPlacementCalendarInfo = async (contractorId) => {
    const response = await fetch(`/api/placement/contractor/calendarInfo/${contractorId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

// *********************COMPANY PLACEMENTS**************
export const getCompanyPlacementCalendarInfo = async (companyId) => {
    const response = await fetch(`/api/placement/company/calendarInfo/${companyId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getCompanyPlacementTableInfo = async (companyId) => {
    const response = await fetch(`/api/placement/company/tableInfo/${companyId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}
