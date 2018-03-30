import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './state';
import mapDispatchToProps from './dispatch';
import CartItem from '../../components/cartItem';
import './cart.scss';

class Cart extends PureComponent {
    render () {
        let { cartList } = this.props;
        return <div id="cart">
            <header>
                购物车
                <span className="edit">编辑</span>
            </header>
            <div className="cart-list">
                <ul>
                    {
                        cartList.map((item, index) => {
                            return <CartItem key={index} item={item}></CartItem>;
                        })
                    }
                </ul>
            </div>
            <footer>
                <p>
                    <span className="iconfont icon-querenwancheng"></span>
                    全选
                </p>
                <p>
                    <span>合计：<b>￥0</b></span>
                    <button>结算</button>
                </p>
            </footer>
        </div>;
    }
    componentDidMount () {
        this.props.fetchGoodsList(this.props.history);
    }
    componentDidUpdate () {
        // console.log('updata');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);