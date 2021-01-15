import {
    GET_IPAD_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    ipadData: [],
};

function ipadReducer(state = initialState, action) {
    switch (action.type) {
        case GET_IPAD_LIST_SUCCESS: {
            const { data, more } = action.payload;
            if (more) {
                return {
                    ...state,
                    ipadData: [
                        ...state.ipadData,
                        ...data,
                    ],
                }
            }
            return {
                ...state,
                ipadData: [
                    ...data,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default ipadReducer;