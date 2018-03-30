import { combineReducers } from 'redux';

// 添加购物车
export const ADD_CART = 'ADD_CART';
// 删除商品
export const DELETE_CART = 'DELETE_CART';
// 改变商品数量
export const UPDATE_GOODS_COUNT = 'UPDATE_GOODS_COUNT';
// 改变商品选中与否
export const UPDATE_GOODS_SELECTED = 'UPDATE_GOODS_SELECTED';

let initState = {
    cart_list: []
}

function cart_list(state = initState.cart_list, action) {
    switch (action.type) {
    case ADD_CART:
        let flag = false; // 新加的商品购物车里还没有
        state.forEach((item, index) => { // 购物车去重
            if (item.goods_id == action.data.goods_id) {
                ++item.count;
                flag = true;
            }
        });
        return flag ? [...state] : [...state, action.data];
        break;
    case UPDATE_GOODS_COUNT:
        let arr = [...state];
        arr.forEach((item) => {
            if (item.goods_id == action.id) {
                item.count = action.data;
            }
        });
        return arr;
        break;
    case UPDATE_GOODS_SELECTED:
        let arr2 = [...state];
        arr2.forEach((item) => {
            if (item.goods_id == action.id) {
                item.selected = action.data;
            }
        });
        return arr2;
    default: return state;
    }
    return state;
}

export default combineReducers({
    cart_list
})