import {
    ADD_CART_SUCCESS,
    GET_CART_SUCCESS,
    DELETE_PRODUCT_CART_SUCCESS,

    LOGOUT_SUCCESS,
    COMPLETE_PAYMENT_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    cartData: [],
};

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CART_SUCCESS: {
            return {
                ...state,
                cartData: [
                    ...state.cartData,
                    action.payload,
                ],
            }
        }
        case GET_CART_SUCCESS: {
            return {
                ...state,
                cartData: [
                    ...action.payload,
                ],
            }
        }
        case DELETE_PRODUCT_CART_SUCCESS: {
            const { id } = action.payload;
            const newCartData = state.cartData;
            const taskIndex = state.cartData.findIndex((item) => item.id === id);
            newCartData.splice(taskIndex, 1)
            return {
                ...state,
                cartData: [
                    ...newCartData,
                ],
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                cartData: [],
            }
        }
        case COMPLETE_PAYMENT_SUCCESS: {
            return {
                cartData: [],
            }
        }
        default: {
            return state;
        }
    }
}
export default cartReducer;