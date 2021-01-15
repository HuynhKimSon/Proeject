import { fork } from 'redux-saga/effects';

import phoneSaga from './phone.saga';
import applewatchSaga from './applewatch.saga';
import macbookSaga from './macbook.saga';
import ipadSaga from './ipad.saga';
import repairSaga from './repair.saga';

import registerSaga from './register.saga';
import authenSaga from './auth.saga';

import productdetailSaga from './productDetail.saga';

import searchSaga from './search.saga';
import feedbackSaga from './feedback.saga';
import cartSaga from './cart.saga';
import historySaga from './history.saga';

import homeSaga from './home.saga';

export default function* mySaga() {
    yield fork(phoneSaga);
    yield fork(applewatchSaga);
    yield fork(macbookSaga);
    yield fork(ipadSaga);
    yield fork(repairSaga);

    yield fork(registerSaga);
    yield fork(authenSaga);

    yield fork(productdetailSaga);

    yield fork(searchSaga);
    yield fork(feedbackSaga);
    yield fork(cartSaga);
    yield fork(historySaga);

    yield fork(homeSaga);
}