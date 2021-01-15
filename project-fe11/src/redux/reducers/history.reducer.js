import {
    GET_HISTORY_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    historyData: [],
};

function historyReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HISTORY_SUCCESS: {
            return {
                ...state,
                historyData: [
                    ...action.payload,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default historyReducer;