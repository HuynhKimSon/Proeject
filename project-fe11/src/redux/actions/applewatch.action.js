import {
    GET_APPLE_WATCH_LIST,
} from '../constants/index.constant';
export function getAppleWatchList(params) {
    return {
        type: GET_APPLE_WATCH_LIST,
        payload: params,
    }
}