import {
    GET_APPLE_WATCH_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    applewatchData: [],
};

function applewatchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_APPLE_WATCH_LIST_SUCCESS: {
            const { data, more } = action.payload;
            if (more) {
                return {
                    ...state,
                    applewatchData: [
                        ...state.applewatchData,
                        ...data,
                    ],
                }
            }
            return {
                ...state,
                applewatchData: [
                    ...data,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default applewatchReducer;