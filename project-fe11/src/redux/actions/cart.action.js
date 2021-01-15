import {
    ADD_CART,
    GET_CART,
    DELETE_PRODUCT_CART,
    COMPLETE_PAYMENT,
} from '../constants/index.constant';

export function addCart(params) {
    return {
        type: ADD_CART,
        payload: params,
    }
}
export function getCart(params) {
    return {
        type: GET_CART,
        payload: params,
    }
}
export function deleteProductCart(params) {
    return {
        type: DELETE_PRODUCT_CART,
        payload: params,
    }
}
export function completePayment(params) {
    return {
        type: COMPLETE_PAYMENT,
        payload: params,
    }
}
