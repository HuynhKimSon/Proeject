import {
    GET_MAC_BOOK_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    macbookData: [],
};

function macbookReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MAC_BOOK_LIST_SUCCESS: {
            const { data, more } = action.payload;
            if (more) {
                return {
                    ...state,
                    macbookData: [
                        ...state.macbookData,
                        ...data,
                    ],
                }
            }
            return {
                ...state,
                macbookData: [
                    ...data,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default macbookReducer;