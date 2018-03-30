import React, { Component } from 'react';
import './IndexTotal.css';
import $http from '../utils/http';
import RouterWrapper from '../components/routeWrapper';
import { NavLink } from 'react-router-dom';
import Toast from 'react-toast-mobile';
import 'react-toast-mobile/lib/react-toast-mobile.css';

class Index extends Component {
    render () {
        let { routes } = this.props;
        return <div id="index">
            <Toast/>
            <div className="content">
                <RouterWrapper routes={routes}></RouterWrapper>
            </div>
            <ul className="nav">
                <li>
                    <NavLink to="/index/home" activeClassName="tab-active">
                        <span className="iconfont icon-iconhuidaoshouye"></span>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/catagory" activeClassName="tab-active">
                        <span className="iconfont icon-fenlei"></span>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/cart" activeClassName="tab-active">
                        <span className="iconfont icon-gouwuche"></span>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/mine" activeClassName="tab-active">
                        <span className="iconfont icon-wode"></span>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
        </div>;
    }
    componentDidMount () {
        
    }
}

export default Index;