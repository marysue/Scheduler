//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_COMPANY_PLACEMENT_DATES = '/user/placement/SET_COMPANY_PLACEMENT_DATES';
export const REMOVE_COMPANY_PLACEMENT_DATES = '/user/placement/REMOVE_COMPANY_PLACEMENT_DATES';
export const SET_COMPANY_PLACEMENT_INFO = '/user/placement/SET_COMPANY_PLACEMENT_INFO';
export const REMOVE_COMPANY_PLACEMENT_INFO = '/user/placement/REMOVE_COMPANY_PLACEMENT_INFO';

export const setAgencyCompanyPlacementDates = placementDatesArray => ({ type: SET_COMPANY_PLACEMENT_DATES, placementDatesArray})
export const removeAgencyCompanyPlacementDates = () => ({ type: REMOVE_COMPANY_PLACEMENT_DATES})
export const setAgencyCompanyPlacementInfo = placementInfoArray => ({ type: SET_COMPANY_PLACEMENT_INFO, placementInfoArray})
export const removeAgencyCompanyPlacementInfo = () => ({ type: REMOVE_COMPANY_PLACEMENT_INFO})

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_COMPANY_PLACEMENT_DATES: {
            const newState = { ...state}
            newState.placementDates = action.placementDatesArray;
            console.log("Setting placement dates array: ", newState.placementDates)
            return newState;
        }
        case REMOVE_COMPANY_PLACEMENT_DATES: {
            const newState = { ...state}
            delete newState.placementDates
            return newState;
        }
        case SET_COMPANY_PLACEMENT_INFO: {
            const newState = { ...state}
            newState.placementInfo = action.placementInfoArray;
            console.log("Set placement info: ", newState.placementInfo)

            return newState
        }
        case REMOVE_COMPANY_PLACEMENT_INFO: {
            const newState = { ...state}
            delete newState.placementInfo
            return newState;
        }
        default:
            return state;
    }
}

//  ****************** AGENCY ********************
// *********************COMPANY PLACEMENTS**************
export const getAllAgencyCompanyPlacementCalendarInfo = async () => {
    const response = await fetch(`/api/placement/agency/company/calendarInfo/all`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getAllAgencyCompanyPlacementTableInfo = async () => {
    const response = await fetch(`/api/placement/agency/company/tableInfo/all`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}
