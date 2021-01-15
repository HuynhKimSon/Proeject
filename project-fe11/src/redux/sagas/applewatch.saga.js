import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_APPLE_WATCH_LIST,
    GET_APPLE_WATCH_LIST_SUCCESS,
    GET_APPLE_WATCH_LIST_FAIL,
} from '../constants/index.constant';

function* getAppleWatchListSaga(action) {
    try {
        const { page, type, style, priceGTE, priceLTE, more } = action.payload;
        let APIUrl = style
            ? `http://localhost:3001/productData?_page=${page}&type=${type}&_limit=12&style=${style}&price_gte=${priceGTE}&price_lte=${priceLTE}`
            : `http://localhost:3001/productData?_page=${page}&type=${type}&_limit=12&price_gte=${priceGTE}&price_lte=${priceLTE}`
        const response = yield axios.get(APIUrl);
        const data = response.data;
        yield put({
            type: GET_APPLE_WATCH_LIST_SUCCESS,
            payload: {
                data,
                more,
            },
        });
    } catch (error) {
        yield put({
            type: GET_APPLE_WATCH_LIST_FAIL,
            payload: error,
        });
    }
}

export default function* applewatchSaga() {
    yield takeEvery(GET_APPLE_WATCH_LIST, getAppleWatchListSaga);
}