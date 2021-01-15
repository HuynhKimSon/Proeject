import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    GET_PROFILE_LIST_SUCCESS,
    EDIT_PROFILE_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    userData: {},
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                userData: {
                    ...action.payload,
                },
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                userData: {},
            }
        }
        case GET_PROFILE_LIST_SUCCESS: {
            return {
                ...state,
                userData: {
                    ...action.payload,
                },
            }
        }
        case EDIT_PROFILE_LIST_SUCCESS: {
            return {
                ...state,
                userData: {
                    ...action.payload
                },
            }
        }
        default: {
            return state;
        }
    }
}

export default authReducer;