//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_PLACEMENT_DATES = '/user/placement/SET_PLACEMENT_DATES';
export const REMOVE_PLACEMENT_DATES = '/user/placement/REMOVE_PLACEMENT_DATES';
export const SET_PLACEMENT_INFO = '/user/placement/SET_PLACEMENT_INFO';
export const REMOVE_PLACEMENT_INFO = '/user/placement/REMOVE_PLACEMENT_INFO';

export const setPlacementDates = placementDatesArray => ({ type: SET_PLACEMENT_DATES, placementDatesArray})
export const removePlacementDates = () => ({ type: REMOVE_PLACEMENT_DATES})
export const setPlacementInfo = placementInfoArray => ({ type: SET_PLACEMENT_INFO, placementInfoArray})
export const removePlacementInfo = () => ({ type: REMOVE_PLACEMENT_INFO})

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_PLACEMENT_DATES: {
            const newState = { ...state}
            newState.placementDates = action.placementDatesArray;
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
