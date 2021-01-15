import {
    GET_PRODUCT_DETAIL,
} from '../constants/index.constant';
export function getProductDetail(params) {
    return {
        type: GET_PRODUCT_DETAIL,
        payload: params,
    }
}
