import {
    LOGIN,
    LOGOUT,
    GET_PROFILE_LIST,
    EDIT_PROFILE_LIST,
} from '../constants/index.constant';

export function LoginUser(params) {
    return {
        type: LOGIN,
        payload: params,
    }
}
export function Logout(params) {
    return {
        type: LOGOUT,
        payload: params,
    }
}
export function editProfile(params) {
    return {
        type: EDIT_PROFILE_LIST,
        payload: params,
    }
}
export function getProfile(params) {
    return {
        type: GET_PROFILE_LIST,
        payload: params,
    }
}