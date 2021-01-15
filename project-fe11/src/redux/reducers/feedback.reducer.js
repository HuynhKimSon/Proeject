import {
    CREATE_FEED_BACK_SUCCESS,
    GET_FEED_BACK_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    feedbackData: [],
};

function feedbackReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_FEED_BACK_SUCCESS: {
            return {
                ...state,
                feedbackData: [
                    action.payload,
                    ...state.feedbackData,
                ],
            }
        }
        case GET_FEED_BACK_SUCCESS: {
            return {
                ...state,
                feedbackData: [
                    ...action.payload,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default feedbackReducer;