//eslint-disable-next-line
import { baseUrl } from '../config';

export const SET_COMPANY_ID = 'user/company/SET_COMPANY_ID';
export const REMOVE_COMPANY_ID = 'user/company/REMOVE_COMPANY_ID';
export const SET_COMPANY_NAME = '/user/company/SET_COMPANY_NAME';
export const REMOVE_COMPANY_NAME = '/user/company/REMOVE_COMPANY_NAME';
export const SET_NAME = '/user/company/SET_NAME';
export const REMOVE_NAME = '/user/company/REMOVE_NAME';
export const SET_PHONE = '/user/company/SET_PHONE';
export const REMOVE_PHONE = '/user/company/REMOVE_PHONE';
export const SET_EMAIL = '/user/company/SET_EMAIL';
export const REMOVE_EMAIL = '/user/company/REMOVE_EMAIL';
export const SET_ADDR1= '/user/company/SET_SETR1';
export const REMOVE_ADDR1 = '/user/company/REMOVE_SETR1';
export const SET_ADDR2 = '/user/company/SET_SETR2';
export const REMOVE_ADDR2 = '/user/company/REMOVE_SETR2';
export const SET_CITY = '/user/company/SET_CITY';
export const REMOVE_CITY = '/user/company/REMOVE_CITY';
export const SET_STATE = '/user/company/SET_STATE';
export const REMOVE_STATE = '/user/company/REMOVE_STATE';
export const SET_ZIP = '/user/company/SET_ZIP'
export const REMOVE_ZIP = '/user/company/REMOVE_ZIP';

export const setCompanyId = id => ({ type: SET_COMPANY_ID, id})
export const removeCompanyId = () => ({ type: REMOVE_COMPANY_ID})
export const setCompanyName = name => ({ type: SET_COMPANY_NAME, name })
export const removeCompanyName = () => ({type: REMOVE_COMPANY_NAME })
export const setCompanyContactName = name => ({type: SET_NAME, name })
export const removeCompanyContactName = () => ({type: REMOVE_NAME })
export const setCompanyPhone = phone => ({type: SET_PHONE, phone })
export const removeCompanyPhone = () => ({type: REMOVE_PHONE })
export const setCompanyEmail = email => ({ type: SET_EMAIL, email})
export const removeCompanyEmail = () => ({ type: REMOVE_EMAIL})
export const setCompanyAddr1 = addr1 => ({ type: SET_ADDR1, addr1 })
export const removeCompanyAddr1 = () => ({ type: REMOVE_ADDR1 })
export const setCompanyAddr2 = addr2 => ({ type: SET_ADDR2, addr2 })
export const removeCompanyAddr2 = () => ({ type: REMOVE_ADDR2 })
export const setCompanyCity = city => ({ type: SET_CITY, city })
export const removeCompanyCity = () => ({ type: REMOVE_CITY })
export const setCompanyState = state => ({ type: SET_STATE, state })
export const removeCompanyState = () => ({ type: REMOVE_STATE })
export const setCompanyZip = zip => ({ type: SET_ZIP, zip })
export const removeCompanyZip = () => ({ type: REMOVE_ZIP })


export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_COMPANY_ID: {
            const newState = { ...state};
            newState.companyId = action.id;
            console.log("Setting company id: ", newState.companyId);
            return newState;
          }
          case REMOVE_COMPANY_ID: {
            const newState = { ...state};
            console.log("Removing company id: ", newState.companyId);
            delete newState.companyId;
            return newState;
          }
        case SET_COMPANY_NAME: {
            const newState = { ...state};
            newState.companyName = action.name;
            console.log("Setting company name: ", newState.companyName);
            return newState;
          }
          case REMOVE_COMPANY_NAME: {
            const newState = { ...state};
            console.log("Removing company name: ", newState.companyName);
            delete newState.companyName;
            return newState;
          }
        case SET_NAME: {
            const newState = { ...state};
            newState.name  = action.name
            console.log("Setting name: ", newState.name);
            return newState;
        }
        case REMOVE_NAME: {
            const newState = { ...state};
            console.log("Removing name: ", newState.name);
            delete newState.name;
            return newState;
          }
        case SET_PHONE: {
            const newState = { ...state};
            newState.phone  = action.phone
            console.log("Setting phone: ", newState.phone);
            return newState;
        }
        case REMOVE_PHONE: {
            const newState = { ...state};
            console.log("Removing phone: ", newState.phone);
            delete newState.phone;
            return newState;
          }
        case SET_EMAIL: {
            const newState = { ...state};
            newState.email  = action.email
            console.log("Setting email: ", newState.email);
            return newState;
        }
        case REMOVE_EMAIL: {
            const newState = { ...state};
            console.log("Removing email: ", newState.email);
            delete newState.email;
            return newState;
          }
        case SET_ADDR1: {
            const newState = { ...state};
            newState.addr1  = action.addr1
            console.log("Setting addr1:", newState.addr1);
            return newState;
        }
        case REMOVE_ADDR1: {
            const newState = { ...state};
            console.log("Removing addr1: ", newState.addr1);
            delete newState.addr1;
            return newState;
          }
        case SET_ADDR2: {
            const newState = { ...state};
            newState.addr2  = action.addr2
            console.log("Setting addr2:", newState.addr2);
            return newState;
        }
        case REMOVE_ADDR2: {
            const newState = { ...state};
            console.log("Removing addr2: ", newState.addr2);
            delete newState.addr2;
            return newState;
          }
        case SET_CITY: {
            const newState = { ...state};
            newState.city  = action.city
            console.log("Setting city", newState.city);
            return newState;
        }
        case REMOVE_CITY: {
            const newState = { ...state};
            console.log("Removing city: ", newState.city);
            delete newState.city;
            return newState;
          }
        case SET_STATE: {
            const newState = { ...state};
            newState.state  = action.state
            console.log("Setting state", newState.state);
            return newState;
        }
        case REMOVE_STATE: {
            const newState = { ...state};
            console.log("Removing state: ", newState.state);
            delete newState.state;
            return newState;
          }
        case SET_ZIP: {
            const newState = { ...state};
            newState.zip  = action.zip
            console.log("Setting zip: ", newState.zip);
            return newState;
        }
        case REMOVE_ZIP: {
            const newState = { ...state};
            console.log("Removing zip: ", newState.zip);
            delete newState.zip;
            return newState;
          }
          default:
            return state;
    }
}

export const addCompany = async (userId, companyName) => {
    const response = await fetch(`/api/company/add/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({companyName})
    });
    return await response.json();
  }

  export const addCompanyContact = async (companyId_fk, companyName, name, phone, email, addr1, addr2, city, state, zip) => {
    const response = await fetch(`/api/company/contact/${companyId_fk}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
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

    export const getCompanyInfo = async (userId) => {
      const response = await fetch(`/api/company/info/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
        return response.json();
    }

    export const getCompany = async (userId) => {
      const response = await fetch(`/api/company/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        }});
        return response.json();
    }
