
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
            console.log("Setting user type:  ", action.userType)
            const newState = {...state};
            newState.userType = action.userType;
            console.log("     Updated state after setting: ", newState);
            return newState;
        }
        case REMOVE_USER_TYPE: {
            const newState = {...state};
            console.log("Removing user type: ", newState.userType)
            delete newState.userType;
            console.log("     Updated state after setting: ", newState);
            return newState;
        }
        case SET_USER_ID: {
            console.log("Setting user id: ", action.id)
            const newState = {...state};
            newState.userId = action.id;
            console.log("     Updated state after setting: ", newState);
            return newState;
        }
        case REMOVE_USER_ID: {
            const newState = { ...state};
            console.log("Removing user id: ", newState.userId);
            delete newState.userId;
            console.log("     Updated state after setting: ", newState);
            return newState;
        }
        case SET_TOKEN: {
            console.log("Setting user token: ", action.token);
            const newState = { ...state}
            newState.token = action.token
            console.log("     Updated state after setting: ", newState);
            return newState;
          }
          case REMOVE_TOKEN: {
            const newState = { ...state };
            console.log("Removing token: ", newState.token);
            delete newState.token;
            console.log("     Updated state after setting: ", newState);
            return newState;
          }
          case SET_AVATAR_URL: {
              console.log("Setting avatar url: ", action.avatarURL);
              const newState = { ...state };
              newState.avatarURL = action.avatarURL;
              console.log("     Updated state after setting: ", newState);
              return newState;
          }
          case REMOVE_AVATAR_URL: {
            const newState = { ...state};
            console.log("Removing avatar url: ", newState.avatarURL);
            delete newState.avatarURL;
            console.log("     Updated state after setting: ", newState);
            return newState;
          }
          case SET_USER_NAME: {
              const newState = { ...state };
              console.log("Setting userName:  ", action.name);
              newState.userName = action.name;
              console.log("     Updated state after setting: ", newState);
              return newState;
          }
          case REMOVE_USER_NAME: {
            const newState = { ...state };
            console.log("Removing user name: ", newState.userName);
            delete newState.userName;
            console.log("     Updated state after setting: ", newState);
            return newState;
          }
          case SET_USER_EMAIL: {
            const newState = { ...state };
            console.log("Setting user email: ", action.emailAddress);
            newState.emailAddress = action.emailAddress;
            console.log("     Updated state after setting: ", newState);
            return newState;
          }
          case REMOVE_USER_EMAIL: {
            const newState = { ...state};
            console.log("Removing user email: ", newState.emailAddress);
            delete newState.emailAddress;
            console.log("     Updated state after setting: ", newState);
            return newState;
          }
        default:
            return state;
    }
}

export const loadToken = () => {
    //maybe should check store before cheking local Storage for token?
    const token = window.localStorage.getItem(TOKEN_KEY);
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
      }),
    });
    return await response.json();
  }
