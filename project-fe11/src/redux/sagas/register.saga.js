import React from 'react';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';
import { InfoCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import history from '../../util/history'
import {
    CREATE_REGISTER,
    CREATE_REGISTER_SUCCESS,
    CREATE_REGISTER_FAIL,

    GET_REGISTER_LIST,
    GET_REGISTER_LIST_SUCCESS,
    GET_REGISTER_LIST_FAIL
} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* createRegisterSaga(action) {
    try {
        const { email, password, confirm, phone } = action.payload;

        // Check Email
        const responseEmail = yield axios.get(`${APIUrl}/userData?email=${email}`);
        const dataCheckEmail = responseEmail.data;

        // Check Phone
        const responsePhone = yield axios.get(`${APIUrl}/userData?phone=${phone}`);
        const dataCheckPhone = responsePhone.data;

        if (dataCheckEmail.length > 0) {
            yield notification.open({
                message: 'Email của bạn đã được sử dụng.',
                className: 'custom-class',
                duration: 1.5,
                icon: <InfoCircleOutlined style={{ marginTop: 6, color: "#fc0303" }} />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
        } else if (dataCheckPhone.length > 0) {
            yield notification.open({
                message: 'Số điện thoại của bạn đã được sử dụng.',
                className: 'custom-class',
                duration: 2,
                icon: <InfoCircleOutlined style={{ marginTop: 6, color: "#fc0303" }} />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
        } else {
            const response = yield axios.post(`${APIUrl}/userData`, { email, password, confirm, phone });
            const data = response.data;
            yield put({
                type: CREATE_REGISTER_SUCCESS,
                payload: data,
            });
            yield notification.open({
                message: 'Đăng Ký Thành Công',
                className: 'custom-class',
                duration: 1.5,
                icon: <CheckCircleTwoTone style={{ marginTop: 6 }} twoToneColor="#52c41a" />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
            yield history.push('/login');
        }
    } catch (error) {
        yield put({
            type: CREATE_REGISTER_FAIL,
            payload: error,
        });
    }
}

function* getListRegisterSaga() {
    try {
        const response = yield axios.get(`${APIUrl}/userData`);
        const data = response.data;
        yield put({
            type: GET_REGISTER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_REGISTER_LIST_FAIL,
            payload: error,
        });
    }
}

export default function* registerSaga() {
    yield takeEvery(CREATE_REGISTER, createRegisterSaga);
    yield takeEvery(GET_REGISTER_LIST, getListRegisterSaga);
}