import {
    GET_PHONE_HOME_LIST,
    GET_IPAD_HOME_LIST,
    GET_APPLE_WATCH_HOME_LIST,
    GET_MAC_BOOK_HOME_LIST
} from '../constants/index.constant';
export function getPhoneHomeList(params) {
    return {
        type: GET_PHONE_HOME_LIST,
        payload: params,
    }
}
export function getIpadHomeList(params) {
    return {
        type: GET_IPAD_HOME_LIST,
        payload: params,
    }
}
export function getAppleWatchHomeList(params) {
    return {
        type: GET_APPLE_WATCH_HOME_LIST,
        payload: params,
    }
}
export function getMacBookHomeList(params) {
    return {
        type: GET_MAC_BOOK_HOME_LIST,
        payload: params,
    }
}