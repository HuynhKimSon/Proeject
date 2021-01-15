import {
    CREATE_REGISTER,
    GET_REGISTER_LIST,
} from '../constants/index.constant';

export function createRegister(params) {
    return {
        type: CREATE_REGISTER,
        payload: params,
    }
}
export function getListRegister(params) {
    return {
        type: GET_REGISTER_LIST,
        payload: params,
    }
}