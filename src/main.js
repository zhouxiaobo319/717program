import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// config router
import router from './router/router.config';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import RouterWrapper from './components/routeWrapper';

// font set & common style set
import './utils/fontset';
import './static/css/reset.css';
import './static/fonts/iconfont.css';
import './static/css/common.css';
import './static/css/goodsItem.css';

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/index/home"></Redirect>
            <RouterWrapper routes={router.routes}></RouterWrapper>
        </Switch>
    </BrowserRouter>
</Provider>, document.querySelector('#root'));