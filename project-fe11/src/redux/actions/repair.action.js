import {
    GET_REPAIR_LIST,
} from '../constants/index.constant';
export function getRepairList(params) {
    return {
        type: GET_REPAIR_LIST,
        payload: params,
    }
}