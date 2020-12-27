//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_CONTRACTOR_ID = 'user/placement/SET_CONTRACTOR_ID';
export const REMOVE_CONTRACTOR_ID = 'user/placement/REMOVE_CONTRACTOR_ID';
export const SET_CONTRACTOR_PLACEMENT_DATES = '/user/placement/SET_CONTRACTOR_PLACEMENT_DATES';
export const REMOVE_CONTRACTOR_PLACEMENT_DATES = '/user/placement/REMOVE_CONTRACTOR_PLACEMENT_DATES';
export const SET_CONTRACTOR_PLACEMENT_INFO = '/user/placement/SET_CONTRACTOR_PLACEMENT_INFO';
export const REMOVE_CONTRACTOR_PLACEMENT_INFO = '/user/placement/REMOVE_CONTRACTOR_PLACEMENT_INFO';

export const setAgencyContractorPlacementDates = placementDatesArray => ({ type: SET_CONTRACTOR_PLACEMENT_DATES, placementDatesArray})
export const removeAgencyContractorPlacementDates = () => ({ type: REMOVE_CONTRACTOR_PLACEMENT_DATES})
export const setAgencyContractorPlacementInfo = placementInfoArray => ({ type: SET_CONTRACTOR_PLACEMENT_INFO, placementInfoArray})
export const removeAgencyContractorPlacementInfo = () => ({ type: REMOVE_CONTRACTOR_PLACEMENT_INFO})

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_CONTRACTOR_PLACEMENT_DATES: {
            const newState = { ...state}
            newState.placementDates = action.placementDatesArray;
            console.log("Setting placement dates array: ", newState.placementDates)
            return newState;
        }
        case REMOVE_CONTRACTOR_PLACEMENT_DATES: {
            const newState = { ...state}
            delete newState.placementDates
            return newState;
        }
        case SET_CONTRACTOR_PLACEMENT_INFO: {
            const newState = { ...state}
            newState.placementInfo = action.placementInfoArray;
            console.log("Set placement info: ", newState.placementInfo)
            return newState
        }
        case REMOVE_CONTRACTOR_PLACEMENT_INFO: {
            const newState = { ...state}
            delete newState.placementInfo
            return newState;
        }
        default:
            return state;
    }
}

//  ****************** AGENCY ********************
// **********************CONTRACTOR******************
export const getAllAgencyContractorPlacementCalendarInfo = async (contractorId) => {
    const response = await fetch(`/api/placement/agency/contractor/calendarInfo/all`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

export const getAllAgencyContractorPlacementTableInfo = async () => {
    const response = await fetch(`/api/placement/agency/contractor/tableInfo/all`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}
