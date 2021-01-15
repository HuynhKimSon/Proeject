import {
    GET_IPAD_LIST,
} from '../constants/index.constant';
export function getIpadList(params) {
    return {
        type: GET_IPAD_LIST,
        payload: params,
    }
}