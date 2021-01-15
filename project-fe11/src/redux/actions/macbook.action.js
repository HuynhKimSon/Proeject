import {
    GET_MAC_BOOK_LIST,
} from '../constants/index.constant';
export function getMacBookList(params) {
    return {
        type: GET_MAC_BOOK_LIST,
        payload: params,
    }
}