import {
    GET_REPAIR_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    repairData: [],
};

function repairReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REPAIR_LIST_SUCCESS: {
            const { data, more } = action.payload;
            if (more) {
                return {
                    ...state,
                    repairData: [
                        ...state.repairData,
                        ...data,
                    ],
                }
            }
            return {
                ...state,
                repairData: [
                    ...data,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default repairReducer;