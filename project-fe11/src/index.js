import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import DefaultLayout from './layout/DefaultLayout';

import Home from './pages/Home/index'
import Register from './pages/Register/index'
import Login from './pages/Login/index'
import Profile from './pages/Profile/index'
import PageError from './pages/Error/index'
import Phone from './pages/Products/Phone/index'
import AppleWatch from './pages/Products/AppleWatch/index';
import MacBook from './pages/Products/MacBook/index';
import Ipad from './pages/Products/Ipad/index';
import Repair from './pages/Products/Repair/index';
import Cart from './pages/Cart/index'

import ProductsDetail from './pages/ProductDetail/index';

import history from './util/history';

import myReducer from './redux/reducers/index.reducer';
import mySaga from './redux/sagas/index.saga';

import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]));
sagaMiddleware.run(mySaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore} >
      <Router history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={Home} />

          <DefaultLayout exact path="/register" component={Register} />
          <DefaultLayout exact path="/login" component={Login} />
          <DefaultLayout exact path="/giohang" component={Cart} />
          <DefaultLayout exact path="/profile" component={Profile} />

          <DefaultLayout exact path="/dienthoai" component={Phone} />
          <DefaultLayout exact path="/applewatch" component={AppleWatch} />
          <DefaultLayout exact path="/macbook" component={MacBook} />
          <DefaultLayout exact path="/maytinhbang" component={Ipad} />
          <DefaultLayout exact path="/suachua" component={Repair} />

          <DefaultLayout exact path="/sanpham/:id" component={ProductsDetail} />

          <DefaultLayout component={PageError} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
