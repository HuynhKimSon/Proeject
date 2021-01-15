import React from 'react';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { notification } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import history from '../../util/history'
import {
    ADD_CART,
    ADD_CART_SUCCESS,
    ADD_CART_FAIL,

    GET_CART,
    GET_CART_SUCCESS,
    GET_CART_FAIL,

    DELETE_PRODUCT_CART,
    DELETE_PRODUCT_CART_SUCCESS,
    DELETE_PRODUCT_CART_FAIL,

    COMPLETE_PAYMENT,
    COMPLETE_PAYMENT_SUCCESS,
    COMPLETE_PAYMENT_FAIL,
} from '../constants/index.constant';

const APIUrl = 'http://localhost:3001';

function* addCartSaga(action) {
    try {
        const { idUser, nameUser, idProduct, nameProduct, imageProduct, priceProduct, quantityProduct, colorProduct, isPay, time } = action.payload;
        const response = yield axios.post(`${APIUrl}/cartData`, { idUser, nameUser, idProduct, nameProduct, imageProduct, priceProduct, quantityProduct, colorProduct, isPay, time });
        const data = response.data;
        yield put({
            type: ADD_CART_SUCCESS,
            payload: data,
        });
        yield notification.open({
            message: `Sản phẩm của bạn đã được thêm vào giỏ hàng.`,
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
    } catch (error) {
        yield put({
            type: ADD_CART_FAIL,
            payload: error,
        });
    }
}

function* getCartSaga(action) {
    try {
        const { idUser } = action.payload;
        const response = yield axios.get(`${APIUrl}/cartData?idUser=${idUser}&isPay=false`);
        const data = response.data;
        yield put({
            type: GET_CART_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_CART_FAIL,
            payload: error,
        });
    }
}

function* deleteProductSaga(action) {
    try {
        const { id } = action.payload;
        yield axios.delete(`${APIUrl}/cartData/${id}`);
        yield put({
            type: DELETE_PRODUCT_CART_SUCCESS,
            payload: { id },
        });
    } catch (error) {
        yield put({
            type: DELETE_PRODUCT_CART_FAIL,
            payload: error,
        });
    }
}

function* completePaymentSaga(action) {
    try {
        const { id, isPay } = action.payload;
        const response = yield axios.patch(`${APIUrl}/cartData/${id}`, { isPay });
        const data = response.data;
        yield put({
            type: COMPLETE_PAYMENT_SUCCESS,
            payload: data,
        });
        yield history.push('/');
    } catch (error) {
        yield put({
            type: COMPLETE_PAYMENT_FAIL,
            payload: error,
        });
    }
}

export default function* cartSaga() {
    yield takeEvery(ADD_CART, addCartSaga);
    yield takeEvery(GET_CART, getCartSaga);
    yield takeEvery(DELETE_PRODUCT_CART, deleteProductSaga);
    yield takeEvery(COMPLETE_PAYMENT, completePaymentSaga);
}