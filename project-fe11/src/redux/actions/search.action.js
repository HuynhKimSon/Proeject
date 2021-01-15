import {
    GET_SEARCH,
} from '../constants/index.constant';
export function getSearch(params) {
    return {
        type: GET_SEARCH,
        payload: params,
    }
}
