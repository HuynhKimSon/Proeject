import {
    CREATE_FEED_BACK,
    GET_FEED_BACK,
} from '../constants/index.constant';

export function createFeedBack(params) {
    return {
        type: CREATE_FEED_BACK,
        payload: params,
    }
}
export function getFeedBack(params) {
    return {
        type: GET_FEED_BACK,
        payload: params,
    }
}