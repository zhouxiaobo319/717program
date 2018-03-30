import React, { Component } from 'react';
import { loginout } from '../../utils/utils';
import './setting.scss';

class Setting extends Component {
    constructor () {
        super();
        this.loginout = this.loginout.bind(this);
    }
    render () {
        return <div id="setting">
            <header>
                <span className="iconfont icon-angle-left"></span>
                <span>设置</span>
            </header>
            <section className="setting-cont">
                <p>我的头像</p>
                <p>用户名</p>
                <p>我的二维码名片</p>
            </section>
            <button onClick={this.loginout}>退出登录</button>
        </div>;
    }
    loginout () {
        loginout();
        this.props.history.push('/index/home');
    }
}

export default Setting;