import {
    CREATE_REGISTER_SUCCESS,
    GET_REGISTER_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    userData: [],
};

function registerReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_REGISTER_SUCCESS: {
            return {
                ...state,
                userData: [
                    ...state.userData,
                    action.payload,
                ],
            }
        }
        case GET_REGISTER_LIST_SUCCESS: {
            return {
                ...state,
                userData: [
                    ...action.payload,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default registerReducer;