import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_SEARCH,
    GET_SEARCH_SUCCESS,
    GET_SEARCH_FAIL,
} from '../constants/index.constant';

function* getSearchSaga(action) {
    try {
        const { name } = action.payload;
        const response = yield axios.get(`http://localhost:3001/productData?q=${name}`);
        const data = response.data;
        yield put({
            type: GET_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_SEARCH_FAIL,
            payload: error,
        });
    }
}

export default function* searchSaga() {
    yield takeEvery(GET_SEARCH, getSearchSaga);
}