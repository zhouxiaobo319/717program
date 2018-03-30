import React, { Component } from 'react';
import './login.css';
import $http from '../../utils/http';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor () {
        super();
        this.toLogin = this.toLogin.bind(this);
    }
    render () {
        return <div id="login">
            <h2>欢迎登录</h2>
            <p>用户名：<input type="text" className="usernemr" ref="username"/></p>
            <p>密&nbsp;&nbsp;&nbsp;码：<input type="password" className="password" ref="password"/></p>
            <p><button onClick={this.toLogin}>登录</button></p>
            <p><Link to='/register'>注册</Link></p>
        </div>;
    }
    toLogin () {
        let { username, password } = this.refs;

        $http.post('/user/login', {
            username: username.value,
            password: password.value
        })
            .then(res => {
                if (res.success == 1) {
                    let from = this.props.location.state ? this.props.location.state.from : '/index/home';
                    document.cookie = 'token=' + res.token;
                    this.props.history.push(from);
                } else {
                    alert('登录出错');
                }
            })
    }
}

export default Login;