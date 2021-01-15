import {
    GET_PHONE_LIST,
} from '../constants/index.constant';
export function getPhoneList(params) {
    return {
        type: GET_PHONE_LIST,
        payload: params,
    }
}
