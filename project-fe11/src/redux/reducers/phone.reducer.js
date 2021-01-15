import {
    GET_PHONE_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    phoneData: [],
};

function phoneReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PHONE_LIST_SUCCESS: {
            const { data, more } = action.payload;
            if (more) {
                return {
                    ...state,
                    phoneData: [
                        ...state.phoneData,
                        ...data,
                    ],
                }
            }
            return {
                ...state,
                phoneData: [
                    ...data,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default phoneReducer;