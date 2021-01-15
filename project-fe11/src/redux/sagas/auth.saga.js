import React from 'react';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';
import { SmileOutlined, InfoCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import history from '../../util/history'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    EDIT_PROFILE_LIST,
    EDIT_PROFILE_LIST_SUCCESS,
    EDIT_PROFILE_LIST_FAIL,

    GET_PROFILE_LIST,
    GET_PROFILE_LIST_SUCCESS,
    GET_PROFILE_LIST_FAIL,
} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* loginUserSaga(action) {
    try {
        const { email, password } = action.payload;
        const response = yield axios.get(`${APIUrl}/userData?email=${email}&password=${password}`);
        const data = response.data;
        if (data[0].id) {
            yield put({
                type: LOGIN_SUCCESS,
                payload: data[0],
            });
            yield localStorage.setItem("user", JSON.stringify(data[0]));
            yield notification.open({
                message: `Xin chào ! ${email}`,
                className: 'custom-class',
                duration: 1.5,
                icon: <SmileOutlined style={{ marginTop: 6, color: "#108ee9" }} />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
            yield history.push('/');
        }
    } catch (error) {
        yield put({
            type: LOGIN_FAIL,
            payload: error,
        });
        yield notification.open({
            message: 'Email hoặc mật khẩu không trùng khớp',
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
    }
}

function* logoutUserSaga() {
    try {
        const response = yield axios.get(`${APIUrl}/userData`);
        const data = response.data;
        yield localStorage.clear();
        yield put({
            type: LOGOUT_SUCCESS,
            payload: data,
        });
        yield notification.open({
            message: `Đăng Xuất Thành Công`,
            className: 'custom-class',
            duration: 1.5,
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            style: {
                width: 350,
                height: 60,
                backgroundColor: "#ffffff",
                ontSize: 18,
                fontWeight: 600,
            },
        });
        yield history.push('/');
    } catch (error) {
        yield put({
            type: LOGOUT_FAIL,
            payload: error,
        });
    }
}

function* editProfileSaga(action) {
    try {
        const { idUser, email, password, phone } = action.payload;

        // Check Email
        const responseEmail = yield axios.get(`${APIUrl}/userData?email=${email}`);
        const dataCheckEmail = responseEmail.data;

        if (dataCheckEmail.length === 0) {
            const response = yield axios.patch(`${APIUrl}/userData/${idUser}`, { email, password, phone });
            const data = response.data;
            yield put({
                type: EDIT_PROFILE_LIST_SUCCESS,
                payload: data,
            });
            yield localStorage.setItem("user", JSON.stringify(data))
            yield notification.open({
                message: `Chỉnh Sửa Thành Công`,
                className: 'custom-class',
                duration: 1.5,
                icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
                style: {
                    width: 350,
                    backgroundColor: "#ffffff",
                    fontSize: 18,
                    fontWeight: 600,
                },
            });
        } else {
            if (dataCheckEmail[0].id === idUser) {
                if (dataCheckEmail[0].email === email || dataCheckEmail[0].password === password || dataCheckEmail[0].phone === phone) {
                    if (dataCheckEmail[0].password !== password || dataCheckEmail[0].phone !== phone) {
                        const response = yield axios.patch(`${APIUrl}/userData/${idUser}`, { password, phone });
                        const data = response.data;
                        yield put({
                            type: EDIT_PROFILE_LIST_SUCCESS,
                            payload: data,
                        });
                        yield localStorage.setItem("user", JSON.stringify(data))
                        yield notification.open({
                            message: `Chỉnh Sửa Thành Công`,
                            className: 'custom-class',
                            duration: 1.5,
                            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
                            style: {
                                width: 350,
                                backgroundColor: "#ffffff",
                                fontSize: 18,
                                fontWeight: 600,
                            },
                        });
                    }
                }
            }
            else {
                yield put({
                    type: EDIT_PROFILE_LIST_FAIL,
                });
                yield notification.open({
                    message: `Email của bạn đã được sử dụng.`,
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
            }
        }
    }
    catch (error) {
        yield put({
            type: EDIT_PROFILE_LIST_FAIL,
            payload: error,
        });
    }
}

function* getProfileSaga(action) {
    try {
        const { idUser } = action.payload;
        const response = yield axios.get(`${APIUrl}/userData/${idUser}`);
        const data = response.data;
        yield put({
            type: GET_PROFILE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_PROFILE_LIST_FAIL,
            payload: error,
        });
    }
}

export default function* authenSaga() {
    yield takeEvery(LOGIN, loginUserSaga);
    yield takeEvery(LOGOUT, logoutUserSaga);
    yield takeEvery(EDIT_PROFILE_LIST, editProfileSaga);
    yield takeEvery(GET_PROFILE_LIST, getProfileSaga);
}