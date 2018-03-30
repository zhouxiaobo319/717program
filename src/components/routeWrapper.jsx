import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../utils/utils';

function isLogin() { // 判断是否登录
    return !!getCookie('token');
}

class RouterWrapper extends Component {
    render () {
        const { routes } = this.props;
        return routes.map((item, index) => {
            return <Route exact={item.exact} path={item.path} key={index} render={(location) => {
                // console.log(item.authorization); // 路由中是否有authorization字段
                // console.log(isLogin(), '是否登录');
                return item.authorization && !isLogin() ? 
                    <Redirect to={{pathname: '/login', state: {from: item.path}}}></Redirect>
                    :
                    <item.component {...location} routes={item.children}></item.component>
                // return <item.component {...location} routes={item.children}></item.component>;
            }}></Route>;
        });
    }
}

export default RouterWrapper;