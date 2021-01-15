import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    CREATE_FEED_BACK,
    CREATE_FEED_BACK_SUCCESS,
    CREATE_FEED_BACK_FAIL,

    GET_FEED_BACK,
    GET_FEED_BACK_SUCCESS,
    GET_FEED_BACK_FAIL,
} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* createFeedbackSaga(action) {
    try {
        const { idUser, idProduct, nameUser, rate, comment, time } = action.payload;
        const response = yield axios.post(`${APIUrl}/feedbackData`, { idUser, idProduct, nameUser, rate, comment, time });
        const data = response.data;
        yield put({
            type: CREATE_FEED_BACK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: CREATE_FEED_BACK_FAIL,
            payload: error,
        });
    }
}

function* getFeedbackSaga(action) {
    try {
        const { id } = action.payload;
        const response = yield axios.get(`${APIUrl}/feedbackData?idProduct=${id}&_sort=id&_order=desc`);
        const data = response.data;
        yield put({
            type: GET_FEED_BACK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_FEED_BACK_FAIL,
            payload: error,
        });
    }
}

export default function* feedbackSaga() {
    yield takeEvery(CREATE_FEED_BACK, createFeedbackSaga);
    yield takeEvery(GET_FEED_BACK, getFeedbackSaga);
}