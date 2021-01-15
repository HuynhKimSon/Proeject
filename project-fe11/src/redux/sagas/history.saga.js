import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_HISTORY,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAIL,

} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* getHistorySaga(action) {
    try {
        const { idUser } = action.payload;
        const response = yield axios.get(`${APIUrl}/cartData?idUser=${idUser}&isPay=true`);
        const data = response.data;
        yield put({
            type: GET_HISTORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_HISTORY_FAIL,
            payload: error,
        });
    }
}

export default function* historySaga() {
    yield takeEvery(GET_HISTORY, getHistorySaga);
}