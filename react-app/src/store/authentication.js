
//eslint-disable-next-line
import { baseUrl } from '../config';

//const
export const USER_TYPE = 'user/authentication/userType';
export const SET_USER_TYPE = 'user/authentication/SET_USER_TYPE';
export const REMOVE_USER_TYPE = 'user/authentication/REMOVE_USER_TYPE';
export const USER_ID = 'user/authentication/userId';
export const SET_USER_ID = 'auth/user/userId';
export const REMOVE_USER_ID = 'user/authentication/REMOVE_USER_ID';
export const USER_NAME = 'auth/user/userName';
export const SET_USER_NAME= 'auth/user/userName';
export const REMOVE_USER_NAME = 'user/authentication/REMOVE_USER_NAME';
export const TOKEN_KEY = 'user/authentication/token';
export const SET_TOKEN = 'user/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'user/authentication/REMOVE_TOKEN';
export const AVATAR_URL = '/user/authentication/avatarURL';
export const SET_AVATAR_URL = 'user/authentication/SET_AVATAR_URL';
export const REMOVE_AVATAR_URL = 'user/authentication/REMOVE_AVATAR_URL';
export const EMAIL = 'user/authentication/EMAIL';
export const SET_USER_EMAIL = 'user/authentication/SET_USER_EMAIL';
export const REMOVE_USER_EMAIL = 'user/authentication/REMOVE_USER_EMAIL';


//actions
export const setUserType = userType => ({ type: SET_USER_TYPE, userType });
export const removeUserType = () => ({ type: REMOVE_USER_TYPE });
export const setToken = token => ({ type: SET_TOKEN, token });
export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setAvatarURL = avatarURL => ({ type: SET_AVATAR_URL, avatarURL});
export const removeAvatarURL = () => ( {type: REMOVE_AVATAR_URL});
export const setUserName = name => ({ type: SET_USER_NAME, name});
export const removeUserName = () => ({ type: REMOVE_USER_NAME })
export const setUserEmail = emailAddress => ({ type: SET_USER_EMAIL, emailAddress});
export const removeUserEmail = () => ({type: REMOVE_USER_EMAIL});
export const setUserId = id => ({ type: SET_USER_ID, id})
export const removeUserId = () => ({ type: REMOVE_USER_ID})



//reducer

//shape of state:
// user: { userId: int,
//         userType: string
// }
export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_USER_TYPE: {
            const newState = {...state};
            newState.userType = action.userType;
            return newState;
        }
        case REMOVE_USER_TYPE: {
            const newState = {...state};
            delete newState.userType;
            console.log("Redux Authentication : Removed userType from state:  ", newState);
            return newState;
        }
        case SET_USER_ID: {
            const newState = {...state};
            newState.userId = action.id;
            return newState;
        }
        case REMOVE_USER_ID: {
            const newState = { ...state};
            delete newState.userId;
            return newState;
        }
        case SET_TOKEN: {
            const newState = { ...state}
            newState.token = action.token
            return newState;
          }
          case REMOVE_TOKEN: {
            const newState = { ...state };
            delete newState.token;
            return newState;
          }
          case SET_AVATAR_URL: {
              const newState = { ...state };
              newState.avatarURL = action.avatarURL;
              return newState;
          }
          case REMOVE_AVATAR_URL: {
            const newState = { ...state};
            delete newState.avatarURL;
            return newState;
          }
          case SET_USER_NAME: {
              const newState = { ...state };
              newState.userName = action.name;
              return newState;
          }
          case REMOVE_USER_NAME: {
            const newState = { ...state };
            delete newState.userName;
            return newState;
          }
          case SET_USER_EMAIL: {
            const newState = { ...state };
            newState.emailAddress = action.emailAddress;
            return newState;
          }
          case REMOVE_USER_EMAIL: {
            const newState = { ...state};
            delete newState.emailAddress;
            return newState;
          }
        default:
            return state;
    }
}

export const loadToken = () => {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
    //   dispatch(setToken(token));
    }
  };
  export const authenticate = async() => {
    const response = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  export const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    return await response.json();
  }

  export const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return await response.json();
  };


  export const signUp = async (username, email, password, userType) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        userType
      })
    });
    return await response.json();
  }
