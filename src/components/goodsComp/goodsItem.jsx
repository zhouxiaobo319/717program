import React, { Component } from 'react';
import $http from '../../utils/http';
import Lazyload from 'react-lazyload';
import { getCookie } from '../../utils/utils';
import { T } from 'react-toast-mobile';

import { connect } from 'react-redux';
import { ADD_CART } from './../../store/reducers';

class Placeholder extends Component {
    render () {
        return <img src={require('../../static/img/nav/nav.gif')} alt=""/>;
    }
}

class GoodsItem extends Component {
    constructor () {
        super();
        this.addCart = this.addCart.bind(this);
    }
    render () {
        let { data } = this.props;
        return <dl className="goods-item" onClick={() => {this.toDetail(data.goods_id)}}>
            <dt>
                <Lazyload height={'100%'} overflow once placeholder={<Placeholder/>} debounce={500}>
                    <img src={'http://www.lb717.com/' + data.obj_data} alt=""/>
                </Lazyload>
            </dt>
            <dd>
                <p className="goods-detail">{data.goods_name}</p>
                <p>
                    <span className="goods-price">{data.discount_price}</span>
                    <span onClick={this.addCart} className="iconfont icon-gouwuche"></span>
                </p>
            </dd>
        </dl>;
    }
    addCart (e) { // 添加购物车
        e.stopPropagation(); // 阻止冒泡

        let { data } = this.props;
        if (getCookie('token')) {
            $http.post('/user/Cart/addCart', {
                goods_id: data.goods_id,
                goods_info: data,
                token: getCookie('token')
            })
                .then((res) => {
                    // console.log(res);
                    if (res == 1) {
                        T.notify('购物车添加成功');
                        
                        // 加入购物车页面
                        this.props.dispatch({
                            type: ADD_CART,
                            data: {
                                ...data,
                                count: 1,
                                selected: 0
                            }
                        });
                    } else { // 登录过期
                        T.notify(res.info);
                        
                        // 重新登陆
                        let { history, location } = this.props;
                        this.props.history.push('/login', {
                            from: location.pathname
                        });
                    }
                });
        } else {
            let { history, location } = this.props;
            this.props.history.push('/login', {
                from: location.pathname // 登录完成后返回原页面
            });
        }
    }
    toDetail (goods_id) {
        this.props.history.push('/detail', {
            goods_id: goods_id
        });
    }
}

export default connect(null)(GoodsItem);