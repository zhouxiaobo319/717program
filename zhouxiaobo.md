# 717program 项目总结

    717program是一个电商网站，用户可以在这里挑选产品，注册、登录后，可购买商品

## 页面
    首页
        搜索页
    分类页
        详情页
    购物车页
        编辑页，删除
    我的页
        登录页
        注册页
        退出登录
        设置页
    邮寄地址管理页
        添加
        邮寄地址列表
    订单管理页
    
## common组件封装
    弹出框

    轮播图

    商品模块

    筛选

    购物车商品模块

    邮寄地址

    404页面

## 技术选型

    搭建webpack；开发环境：development；生产环境：production
    React, redux, react-dom, react-router, react-redux, react-router-dom, redux-sage, react-lazyload

## 功能实现

    首页：
        封装轮播图组件
        点击搜索框跳转搜索页面（search），实现功能搜索记录和删除记录
        搜索：
            如果目前没有搜索记录，显示搜索记录为空
            点击搜索框：判断搜索框是否为空
            本地存储：localStorage
            点击搜索按钮，跳转搜索结果页，并把搜索的内容添加到搜索记录中
            点击搜索记录，跳转搜索结果页
            点击删除，删掉本地存储的内容，清空搜索记录

        商品列表：
            封装商品列表组件，post方法请求数据，传参给组件，渲染到页面
            判断滑动距离分批请求数据（页面的高度 - （滚动的高度 + 视口的高度）< 50）
            图片懒加载
            react-lazyload实现默认图片
            点击商品跳转详情页（detail）

        添加购物车：
            点击添加购物车按钮，阻止冒泡，防止跳转到商品详情页
            token字段判断是否登录，没有登录，跳转登录页面
            已登录，提示添加购物车成功
            把点击的商品详情，传到后台，后台把商品添加到cart_info.json文件中，所登录的账号名下
    
    分类：
        点击搜索框，与首页相同
        左右结构
        点击左边的标题，根据下标调整右边的右边的内容
        遍历类型，渲染
        传入index，activeIndex字段控制点击，添加className

    购物车：
        判断是否登录，没有登录跳转登录页面
        已登录，判断登录的账号
        读取cart_info.json文件中账号对应的商品信息，渲染到页面
        点击编辑
            可删除选中的商品

    我的：
        判断是否登录，没有登录跳转登录页面
        登录后，渲染昵称
        设置
            退出登录功能，操作token字段，设置超时


## 路由搭建

    react-router
    用 react-router-dom 中的 { BrowserRouter, Route, Switch, Redirect, NavLink } 完成路由的搭建

    我的、购物车页面，增加authorization字段，判断authorization是否存在；如果存在，判断是否登录；没有登录，进入登录页面，已登录，进入我的或购物车页面

    let router = {
        routes: [
            {
                path: '/detail', // 详情
                component: Detail
            },
            {
                path: '/login', // 登录
                component: Login
            },
            {
                path: '/register', // 注册
                component: Register
            },
            {
                path: '/setting', // 设置
                component: Setting
            },
            {
                path: '/index',
                component: Index,
                children: [
                    {
                        path: '/index/home', // 首页
                        component: Home
                    },
                    {
                        path: '/index/catagory', // 分类
                        component: Catagory
                    },
                    {
                        path: '/index/cart', // 购物车
                        component: Cart,
                        authorization: true
                    },
                    {
                        path: '/index/mine', // 我的
                        component: Mine,
                        authorization: true
                    },
                    {
                        path: '/index/search', // 搜索页
                        component: Search
                    },
                    {
                        path: '/index/result', // 搜索结果页
                        component: Result
                    }
                ]
            }
        ]
    };

## 传参

    封装组件，调用组件时用props传参
    请求数据时：
        可以用地址栏参数传参
        $http.post('/mall/index/getGoodsChannel?goods_id')
        也可以用他的属性 
        $http.post('/mall/index/getGoodsChannel', {channel_id: this.state.channel_id})

## 登录注册流程

    登录：
        1.前端收集用户名，密码，传给后台
        2.后台在数据库中查找前端传来的信息，如果存在就可以继续，否则返回错误信息
        3.后台根据用户名和密码生成秘钥token(key_code)，把token传给前端
    
    注册：
        1.前端收集用户名，密码，传给后台
        2.后端将数据存到指定数据中
        3.只返回一个成功的信息

## jsonp跨域封装

    动态创建script标签，添加到body，src指定接口地址，准备callback name

# 文档要求：

    1：回去之后看到系项目的代码的文件夹
    2：做项目的总结
    3：你是怎么规划你项目的结构的，你做了哪些功能
    4：你的路由是怎么搭建的
    5：你传参是怎么传的
    6：你的组建时怎么封装的，封装了那些组建
    7：要对你的项目做一个系统性的比较完整的有条理性的总结
    8：md格式，名字.md，里面就是717项目总结
    9：上面先总结一下你这个项目是干什么的，
    你是电商网站用的什么技术react,redux，saga, react-router
    所用到的知识点总结一番，然后在细节的去概括，你在这里面是做某些功能的
    购物车是怎么做的，商品是怎么封装的，还封装了那些comon组建
    你是怎么封装的，核心逻辑是什么，甚至可以把那段核心逻辑代码粘过来，作为你的项目总结