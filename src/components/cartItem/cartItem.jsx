import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from './dispatch';

class CartItem extends Component {
    constructor () {
        super();
        // this.toggleSelect = this.toggleSelect.bind(this);
    }
    render () {
        let { toggleSelect, upDateCount, item } = this.props;
        console.log(item.selected);
        return (
            <li>
                <span
                    onClick={() => {toggleSelect(1 - item.selected, item.goods_id)}}
                    className={item.selected == 0 ? "iconfont " : "iconfont icon-querenwancheng"}>
                </span>
                <span className="list-img">
                    <img src={'http://www.lb717.com/' + item.obj_data} alt=""/>
                </span>
                <div className="cart-cont">
                    <p className="cont-tit">{item.goods_name}</p>
                    <div className="cont">
                        <div className="cont-num">
                            <p>×{item.count}</p>
                            <p>￥{item.discount_price}</p>
                        </div>
                        <div className="cont-btn">
                            <span onClick={() => {upDateCount(--item.count, item.goods_id)}}>-</span>
                            <span>{item.count}</span>
                            <span onClick={() => {upDateCount(++item.count, item.goods_id)}}>+</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default connect(null, mapDispatchToProps, null, {pure: false})(CartItem);
