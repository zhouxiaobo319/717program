import React, { Component } from 'react';
import $http from '../../utils/http';
import SwiperComponent from '../../components/swiper/swiperComp';
import GoodsItem from '../../components/goodsComp/goodsItem';
import './home.scss';

class Home extends Component {
    constructor () {
        super();
        this.state = {
            goodslist: [],
            channel_id: 2,
            caniquery: true
        }
        this.toSearch = this.toSearch.bind(this);
        this.scrolling = this.scrolling.bind(this);
    }
    toSearch () {
        let { history } = this.props;
        history.push('./search');
    }
    render () {
        return <div id="home" onScroll={this.scrolling} ref="scroller">
            <div ref="doc">
                <header>
                    <input type="text" onFocus={this.toSearch}/>
                </header>
                <SwiperComponent></SwiperComponent>
                <section className="home-cat">
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav1.png')} alt=""/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav2.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav3.png')} alt=""/></dt>
                        <dd>牛奶乳品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav4.png')} alt=""/></dt>
                        <dd>休闲零食</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav5.png')} alt=""/></dt>
                        <dd>生鲜果蔬</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav6.png')} alt=""/></dt>
                        <dd>米面粮油</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav7.png')} alt=""/></dt>
                        <dd>调味调料</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/nav/nav8.png')} alt=""/></dt>
                        <dd>酒水饮料</dd>
                    </dl>
                </section>
                <div className="goods-list">
                    {
                        this.state.goodslist.map((item, index) => {
                            return <GoodsItem
                                key={index}
                                data={item}
                                history={this.props.history}
                                location={this.props.location}
                            >
                            </GoodsItem>;
                        })
                    }
                </div>
            </div>
        </div>;
    }
    componentDidMount () {
        $http.post('/mall/index/getGoodsChannel', {channel_id: this.state.channel_id})
            .then(res => {
                this.setState({
                    goodslist: JSON.parse(res).data.data
                });
            });
    }
    scrolling () {
        if (this.state.channel_id > 9) return;
        if (!this.state.caniquery) return;
        let { scroller, doc } = this.refs;
        let st = scroller.scrollTop; // 滚动的高度
        let sw = scroller.offsetHeight; // 视口高度
        let dh = doc.offsetHeight;

        if (dh - (st + sw) < 50) {
            this.setState({
                caniquery: false
            })
            // console.log('满足条件，请求数据');
            this.setState({
                channel_id: ++this.state.channel_id
            })
            let { goodslist } = this.state;
            $http.post('/mall/index/getGoodsChannel', {channel_id: this.state.channel_id})
                .then(res => {
                    
                    this.setState({
                        goodslist: [...goodslist, ...JSON.parse(res).data.data]
                    });
                    this.setState({
                        caniquery: true
                    })
                });
        }
    }
}

export default Home;