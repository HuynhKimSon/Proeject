import {
    GET_SEARCH_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    searchData: [],
};

function searchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SEARCH_SUCCESS: {
            return {
                ...state,
                searchData: [
                    ...action.payload,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default searchReducer;