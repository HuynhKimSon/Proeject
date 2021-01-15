import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL,
} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* getProductDetailSaga(action) {
    try {
        const { id } = action.payload;
        const response = yield axios.get(`${APIUrl}/productData/${id}`);
        const data = response.data;
        yield put({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCT_DETAIL_FAIL,
            payload: error,
        });
    }
}

export default function* productdetailSaga() {
    yield takeEvery(GET_PRODUCT_DETAIL, getProductDetailSaga);
}