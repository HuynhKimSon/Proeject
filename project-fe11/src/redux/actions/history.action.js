import {
    GET_HISTORY,
} from '../constants/index.constant';

export function getHistory(params) {
    return {
        type: GET_HISTORY,
        payload: params,
    }
}
