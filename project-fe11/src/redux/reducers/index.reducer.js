import { combineReducers } from 'redux';
import phoneReducer from '../reducers/phone.reducer';
import applewatchReducer from '../reducers/applewatch.reducer';
import macbookReducer from '../reducers/macbook.reducer';
import ipadReducer from '../reducers/ipad.reducer';
import repairReducer from '../reducers/repair.reducer';

import registerReducer from '../reducers/register.reducer';
import authReducer from '../reducers/auth.reducer';

import productdetailReducer from '../reducers/productDetail.reducer';

import searchReducer from '../reducers/search.reducer';
import feedbackReducer from '../reducers/feedback.reducer';
import cartReducer from '../reducers/cart.reducer';
import historyReducer from '../reducers/history.reducer';

import homeReducer from '../reducers/home.reducer';

export default combineReducers({
    phoneReducer,
    applewatchReducer,
    macbookReducer,
    ipadReducer,
    repairReducer,

    registerReducer,
    authReducer,
    
    productdetailReducer,

    searchReducer,
    feedbackReducer,
    cartReducer,
    historyReducer,

    homeReducer,
})