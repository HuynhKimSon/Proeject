import {
    GET_PRODUCT_DETAIL_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    productDataDetail: {},
};

function productdetailReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_DETAIL_SUCCESS: {
            return {
                ...state,
                productDataDetail: {
                    ...action.payload,
                },
            }
        }
        default: {
            return state;
        }
    }
}
export default productdetailReducer;