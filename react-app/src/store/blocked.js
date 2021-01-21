export const SET_BLOCKED = '/user/placement/SET_BLOCKED';
export const REMOVE_BLOCKED = '/user/placement/REMOVE_BLOCKED';

export const setBlocked = blocked => ({ type: SET_BLOCKED, blocked})
export const removeBlocked = () => ({ type: REMOVE_BLOCKED})

export default function reducer (state = {}, action) {
    switch (action.type) {
        case SET_BLOCKED: {
            const newState = { ...state};
            newState.blocked = action.blocked;
            return newState;
        }
        case REMOVE_BLOCKED: {
            const newState = { ...state};
            delete newState.blocked;
            return newState;
        }
        default:
            return state;
    }
}

export const createBlocked = async (contractorId, blocked) => {
    let blockedStr = '';
    for (let i = 0; i < blocked.length; i++) {
        blockedStr += blocked[i].format('MM/DD/YYYY hh:mm:ss')
        if (i !== blocked.length - 1) {
            blockedStr += ','
        }
    }
    const xmitStr = encodeURI(blockedStr);

    const response = await fetch(`/api/blocked/${contractorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          contractorId,
          blocked: xmitStr
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
