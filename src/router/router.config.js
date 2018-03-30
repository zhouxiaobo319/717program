import React, { Compontent } from 'react';
import Index from '../IndexTotal/IndexTotal';
import Home from '../views/home';
import Catagory from '../views/catagory'; // 分类
import Cart from '../views/cart';
import Mine from '../views/mine';
import Detail from '../views/detail'; // 商品详情
import Login from '../views/login'; // 登录
import Register from '../views/register'; // 注册
import Search from '../views/search'; // 搜索页
import Result from '../views/result'; // 搜索结果页
import Setting from '../views/setting'; // 设置
// 404页面
import NoMatch from '../views/route404/nomatch';

// function Index () {
//     return <div>index</div>;
// }
let router = {
    routes: [
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/setting', // 设置
            component: Setting
        },
        {
            path: '/index',
            component: Index,
            // exact: true,
            children: [
                {
                    path: '/index/home',
                    component: Home
                },
                {
                    path: '/index/catagory',
                    component: Catagory
                },
                {
                    path: '/index/cart',
                    component: Cart,
                    authorization: true
                },
                {
                    path: '/index/mine',
                    component: Mine,
                    authorization: true
                },
                {
                    path: '/index/search',
                    component: Search
                },
                {
                    path: '/index/result',
                    component: Result
                }
            ]
        }
    ]
};

export default router;