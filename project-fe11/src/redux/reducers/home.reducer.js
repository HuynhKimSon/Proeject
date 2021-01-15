import {
    GET_PHONE_HOME_LIST_SUCCESS,
    GET_IPAD_HOME_LIST_SUCCESS,
    GET_APPLE_WATCH_HOME_LIST_SUCCESS,
    GET_MAC_BOOK_HOME_LIST_SUCCESS,
} from '../constants/index.constant';

const initialState = {
    phoneHomeData: [],
    ipadHomeData: [],
    applewatchHomeData: [],
    macbookHomeData: [],
};

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PHONE_HOME_LIST_SUCCESS: {
            return {
                ...state,
                phoneHomeData: [
                    ...action.payload,
                ],
            }
        }
        case GET_IPAD_HOME_LIST_SUCCESS: {
            return {
                ...state,
                ipadHomeData: [
                    ...action.payload,
                ],
            }
        }
        case GET_APPLE_WATCH_HOME_LIST_SUCCESS: {
            return {
                ...state,
                applewatchHomeData: [
                    ...action.payload,
                ],
            }
        }
        case GET_MAC_BOOK_HOME_LIST_SUCCESS: {
            return {
                ...state,
                macbookHomeData: [
                    ...action.payload,
                ],
            }
        }
        default: {
            return state;
        }
    }
}
export default homeReducer;