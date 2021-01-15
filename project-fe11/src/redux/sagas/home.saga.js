import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_PHONE_HOME_LIST,
    GET_PHONE_HOME_LIST_SUCCESS,
    GET_PHONE_HOME_LIST_FAIL,

    GET_IPAD_HOME_LIST,
    GET_IPAD_HOME_LIST_SUCCESS,
    GET_IPAD_HOME_LIST_FAIL,

    GET_APPLE_WATCH_HOME_LIST,
    GET_APPLE_WATCH_HOME_LIST_SUCCESS,
    GET_APPLE_WATCH_HOME_LIST_FAIL,

    GET_MAC_BOOK_HOME_LIST,
    GET_MAC_BOOK_HOME_LIST_SUCCESS,
    GET_MAC_BOOK_HOME_LIST_FAIL,

} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* getPhoneHomeListSaga(action) {
    try {
        const { page } = action.payload
        const response = yield axios.get(`${APIUrl}/productData?_page=${page}&_limit=8&type=phone`);
        const data = response.data;
        yield put({
            type: GET_PHONE_HOME_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({
            type: GET_PHONE_HOME_LIST_FAIL,
            payload: error,
        });
    }
}

function* getIpadHomeListSaga(action) {
    try {
        const { page } = action.payload
        const response = yield axios.get(`${APIUrl}/productData?_page=${page}&_limit=4&type=ipad`);
        const data = response.data;
        yield put({
            type: GET_IPAD_HOME_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({
            type: GET_IPAD_HOME_LIST_FAIL,
            payload: error,
        });
    }
}

function* getAppleWatchHomeListSaga(action) {
    try {
        const { page } = action.payload
        const response = yield axios.get(`${APIUrl}/productData?_page=${page}&_limit=8&type=applewatch`);
        const data = response.data;
        yield put({
            type: GET_APPLE_WATCH_HOME_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({
            type: GET_APPLE_WATCH_HOME_LIST_FAIL,
            payload: error,
        });
    }
}

function* getMacBookHomeListSaga(action) {
    try {
        const { page } = action.payload
        const response = yield axios.get(`${APIUrl}/productData?_page=${page}&_limit=4&type=macbook`);
        const data = response.data;
        yield put({
            type: GET_MAC_BOOK_HOME_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({
            type: GET_MAC_BOOK_HOME_LIST_FAIL,
            payload: error,
        });
    }
}

export default function* homeSaga() {
    yield takeEvery(GET_PHONE_HOME_LIST, getPhoneHomeListSaga);
    yield takeEvery(GET_IPAD_HOME_LIST, getIpadHomeListSaga);
    yield takeEvery(GET_APPLE_WATCH_HOME_LIST, getAppleWatchHomeListSaga);
    yield takeEvery(GET_MAC_BOOK_HOME_LIST, getMacBookHomeListSaga);
}