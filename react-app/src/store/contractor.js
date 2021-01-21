//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_CONTRACTOR_ID = 'user/contractor/SET_CONTRACTOR_ID';
export const REMOVE_CONTRACTOR_ID = 'user/contractor/REMOVE_CONTRACTOR_ID';
export const SET_STAFF_TYPE = 'user/contractor/SET_STAFF_TYPE';
export const REMOVE_STAFF_TYPE = 'user/contractor/REMOVE_STAFF_TYPE';
export const SET_NAME = '/user/contractor/SET_NAME';
export const REMOVE_NAME = '/user/contractor/REMOVE_NAME';
export const SET_PHONE = '/user/contractor/SET_PHONE';
export const REMOVE_PHONE = '/user/contractor/REMOVE_PHONE';
export const SET_EMAIL = '/user/contractor/SET_EMAIL';
export const REMOVE_EMAIL = '/user/contractor/REMOVE_EMAIL';
export const SET_ADDR1= '/user/contractor/SET_SETR1';
export const REMOVE_ADDR1 = '/user/contractor/REMOVE_SETR1';
export const SET_ADDR2 = '/user/contractor/SET_SETR2';
export const REMOVE_ADDR2 = '/user/contractor/REMOVE_SETR2';
export const SET_CITY = '/user/contractor/SET_CITY';
export const REMOVE_CITY = '/user/contractor/REMOVE_CITY';
export const SET_STATE = '/user/contractor/SET_STATE';
export const REMOVE_STATE = '/user/contractor/REMOVE_STATE';
export const SET_ZIP = '/user/contractor/SET_ZIP'
export const REMOVE_ZIP = '/user/contractor/REMOVE_ZIP';
export const SET_AVAILABLE_CONTRACTORS = '/user/contractor/SET_AVAILABLE_CONTRACTORS';
export const REMOVE_AVAILABLE_CONTRACTORS = '/user/contractor/REMOVE_AVAILABLE_CONTRACTORS';

export const setContractorId = id => ({ type: SET_CONTRACTOR_ID, id})
export const removeContractorId = () => ({ type: REMOVE_CONTRACTOR_ID})
export const setStaffType = staffType => ({ type: SET_STAFF_TYPE, staffType})
export const removeStaffType = () => ({ type: REMOVE_STAFF_TYPE})
export const setContractorName = name => ({type: SET_NAME, name })
export const removeContractorName = () => ({type: REMOVE_NAME })
export const setContractorPhone = phone => ({type: SET_PHONE, phone })
export const removeContractorPhone = () => ({type: REMOVE_PHONE })
export const setContractorEmail = email => ({ type: SET_EMAIL, email})
export const removeContractorEmail = () => ({ type: REMOVE_EMAIL})
export const setContractorAddr1 = addr1 => ({ type: SET_ADDR1, addr1 })
export const removeContractorAddr1 = () => ({ type: REMOVE_ADDR1 })
export const setContractorAddr2 = addr2 => ({ type: SET_ADDR2, addr2 })
export const removeContractorAddr2 = () => ({ type: REMOVE_ADDR2 })
export const setContractorCity = city => ({ type: SET_CITY, city })
export const removeContractorCity = () => ({ type: REMOVE_CITY })
export const setContractorState = state => ({ type: SET_STATE, state })
export const removeContractorState = () => ({ type: REMOVE_STATE })
export const setContractorZip = zip => ({ type: SET_ZIP, zip })
export const removeContractorZip = () => ({ type: REMOVE_ZIP })
export const setAvailableContractors = contractors => ({ type: SET_AVAILABLE_CONTRACTORS, contractors })
export const removeAvailableContractors = () => ({ type: REMOVE_AVAILABLE_CONTRACTORS })


export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_CONTRACTOR_ID: {
            const newState = { ...state};
            newState.contractorId = action.id;
            return newState;
          }
          case REMOVE_CONTRACTOR_ID: {
            const newState = { ...state};
            delete newState.contractorId;
            return newState;
          }
        case SET_STAFF_TYPE: {
            const newState = { ...state};
            newState.staffType = action.staffType;
            return newState;
        }
        case REMOVE_STAFF_TYPE: {
            const newState = { ...state};
            delete newState.staffType;
            return newState;
        }
        case SET_NAME: {
            const newState = { ...state};
            newState.name  = action.name
            return newState;
        }
        case REMOVE_NAME: {
            const newState = { ...state};
            delete newState.name;
            return newState;
          }
        case SET_PHONE: {
            const newState = { ...state};
            newState.phone  = action.phone
            return newState;
        }
        case REMOVE_PHONE: {
            const newState = { ...state};
            delete newState.phone;
            return newState;
          }
        case SET_EMAIL: {
            const newState = { ...state};
            newState.email  = action.email
            return newState;
        }
        case REMOVE_EMAIL: {
            const newState = { ...state};
            delete newState.email;
            return newState;
          }
        case SET_ADDR1: {
            const newState = { ...state};
            newState.addr1  = action.addr1
            return newState;
        }
        case REMOVE_ADDR1: {
            const newState = { ...state};
            delete newState.addr1;
            return newState;
          }
        case SET_ADDR2: {
            const newState = { ...state};
            newState.addr2  = action.addr2
            return newState;
        }
        case REMOVE_ADDR2: {
            const newState = { ...state};
            delete newState.addr2;
            return newState;
          }
        case SET_CITY: {
            const newState = { ...state};
            newState.city  = action.city
            return newState;
        }
        case REMOVE_CITY: {
            const newState = { ...state};
            delete newState.city;
            return newState;
          }
        case SET_STATE: {
            const newState = { ...state};
            newState.state  = action.state
            return newState;
        }
        case REMOVE_STATE: {
            const newState = { ...state};
            delete newState.state;
            return newState;
          }
        case SET_ZIP: {
            const newState = { ...state};
            newState.zip  = action.zip
            return newState;
        }
        case REMOVE_ZIP: {
            const newState = { ...state};
            delete newState.zip;
            return newState;
          }
        case SET_AVAILABLE_CONTRACTORS: {
          const newState = { ...state};
          newState.availableContractors = action.contractors;
          return newState;
        }
        case REMOVE_AVAILABLE_CONTRACTORS: {
          const newState = { ...state }
          delete newState.availableContractors;
          return newState;
        }
          default:
            return state;
    }
}

export const addContractor = async (userId, staffType) => {
    const response = await fetch(`/api/contractor/add/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({staffType})
    });
    return await response.json();
  }

  export const addContractorContact = async (contractorId_fk, name, phone, email, addr1, addr2, city, state, zip) => {
    const response = await fetch(`/api/contractor/contact/${contractorId_fk}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        addr1,
        addr2,
        city,
        state,
        zip,
      })});
      return await response.json();
    }

    // Gets the contact information for the contractor
    //name, phone, email, addr1, addr2, city, state, zip ... maybe more???
    export const getContractorContact = async (contractorId) => {
        const response = await fetch(`/api/contractor/contact/${contractorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        return await response.json();
      }

    export const getContractorAvail = async (staffType, dateFrom, dateTo) => {
        //Have not tested decoding on server side.  First place to check if it doesn't work
        console.log("DateFrom: ", dateFrom, " DateTo: ", dateTo);
        const encoded = encodeURI(dateFrom + "/" + dateTo)
        //localhost:5000/api/contractor/available?staffType=Dental%20Assistant&dateRange=2021-01-19%2000:00:00/2021-01-25 00:00:00
        const response = await fetch(`/api/contractor/available?staffType=${staffType}&dateRange=${encoded}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    }

    export const getContractorInfo = async (userId) => {
      const response = await fetch(`/api/contractor/info/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await response.json();
  }

  
