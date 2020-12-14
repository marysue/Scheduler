//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_CONTRACTOR_ID = 'user/placement/SET_CONTRACTOR_ID';
export const REMOVE_CONTRACTOR_ID = 'user/placement/REMOVE_CONTRACTOR_ID';

export const SET_BLOCKED = '/user/placement/SET_BLOCKED';
export const REMOVE_BLOCKED = '/user/placement/REMOVE_BLOCKED';

export const setContractorId = id => ({ type: SET_CONTRACTOR_ID, id})
export const removeContractorId = () => ({ type: REMOVE_CONTRACTOR_ID})
export const setBlocked = blocked => ({ type: SET_BLOCKED, blocked})
export const removeBlocked = () => ({ type: REMOVE_BLOCKED})

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
        case SET_BLOCKED: {
            const newState = { ...state};
            newState.blocked = action.blocked;
            console.log("Setting blocked: ", newState.blocked);
            return newState;
        }
        case REMOVE_BLOCKED: {
            const newState = { ...state};
            console.log("Removing blocked: ", newState.blocked);
            delete newState.blocked;
            return newState;
        }
        default:
            return state;
    }
}

export const createBlocked = async (contractorId, blocked) => {
    //Not sure if I need to URI encode startDate, endDate - see contractor as I uri encoded a fetch call there
    // for an example.  If I do uri encode it, it needs to be uncoded on the backend as well
    const response = await fetch(`/api/blocked/${contractorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          contractorId,
          blocked
        })
    });
    return await response.json();
  }

export const getAllBlocked = async (contractorId) => {
    const response = await fetch(`/api/blocked/${contractorId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
    return await response.json();
}

    // Couldn't assign the returned array to a state, reverting code
    // let newDate = new Date(dateBlocked);
    // console.log("New date object: ", newDate)
    // console.log("Date(dates.blockedDates[0])):  ", new Date(dates.blockedDates[0].blocked));
    // if (!retVal.errors) {
    //     let dateArr = [];
    //     for (let i=0; i<retVal.blockedDates.length; i++) {
    //         dateArr.push(new Date(retVal.blockedDates[i].blocked))
    //     }
    //     console.log("FETCH:  Returning dateArr: ", dateArr);
    //     return dateArr;
    // } else {
    //     console.log("FETCH:  Returning response object: ", retVal);
    //     return retVal;
