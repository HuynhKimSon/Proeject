import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_IPAD_LIST,
    GET_IPAD_LIST_SUCCESS,
    GET_IPAD_LIST_FAIL,
} from '../constants/index.constant';

function* getIpadListSaga(action) {
    try {
        const { page, type, style, priceGTE, priceLTE, more } = action.payload;
        let APIUrl = style
            ? `http://localhost:3001/productData?_page=${page}&_limit=12&type=${type}&style=${style}&price_gte=${priceGTE}&price_lte=${priceLTE}`
            : `http://localhost:3001/productData?_page=${page}&_limit=12&type=${type}&price_gte=${priceGTE}&price_lte=${priceLTE}`
        const response = yield axios.get(APIUrl);
        const data = response.data;
        yield put({
            type: GET_IPAD_LIST_SUCCESS,
            payload: {
                data,
                more,
            }
        });
    } catch (error) {
        yield put({
            type: GET_IPAD_LIST_FAIL,
            payload: error,
        });
    }
}

export default function* ipadSaga() {
    yield takeEvery(GET_IPAD_LIST, getIpadListSaga);
}